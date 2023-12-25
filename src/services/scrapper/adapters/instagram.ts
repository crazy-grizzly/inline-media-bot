import { sortBy } from 'lodash';

import type { IgResponse, InstagramScrapperOptions } from './instagram.types';
import type { MediaScrapper } from '../scrapper.types';
import { InlineQueryResult, InlineQueryResultVideo } from 'telegraf/types';

export class InstagramScrapper implements MediaScrapper {
  private url: string;
  private options: InstagramScrapperOptions;

  private regExp = new RegExp(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(reel\/|p\/)(?:[^\/]+\/)?([^\/?]+)/);

  constructor(
    url: string,
    options: InstagramScrapperOptions,
  ) {
    this.url = url;
    this.options = options;
  }

  private isValidUrl = () => {
    if (typeof this.url !== 'string') {
      return false;
    }
  
    const isValidUrl = this.regExp.test(this.url);
  
    return isValidUrl;
  };

  private getMediaId = () => {
    if (!this.isValidUrl()) {
      throw new Error('Invalid url');
    }

    const groups = this.regExp.exec(this.url);

    return groups?.[2] || null;
  }

  getMedia = async () => {
    const id = this.getMediaId();
  
    if (!id) {
      throw new Error('Can not get media id from url');
    }
  
    const response = await fetch(`https://www.instagram.com/p/${id}?__a=1&__d=dis`, {
      headers: {
        cookie: this.options.cookie,
        "user-agent": this.options.userAgent,
        "x-ig-app-id": this.options.xIgAppId,
        ["sec-fetch-site"]: "same-origin"
      }
    });
    const igResponse = await response.json() as IgResponse;
    const igResponseItem = (igResponse.items || [])[0];
  
    if (!igResponseItem) {
      return null;
    }

    const image_versions = sortBy(igResponseItem.image_versions2?.candidates ?? null, 'width');
    const video_versions = sortBy(igResponseItem.video_versions ?? null, 'width');
    const video_url = video_versions?.[0]?.url ?? null;
    const thumbnail_url = image_versions?.[0].url;
    const title = igResponseItem.caption?.text || 'Sample title';

    if (!video_url) {
      return null;
    }

    const inlineQueryResultVideo: InlineQueryResultVideo = {
      id: '1',
      type: 'video',
      video_url,
      mime_type: 'video/mp4',
      title,
      thumbnail_url,
    };
  
    return inlineQueryResultVideo;
  };
}