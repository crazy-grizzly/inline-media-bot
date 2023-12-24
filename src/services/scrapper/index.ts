import { MediaScrapper } from './scrapper.types';
import { InstagramScrapper } from './adapters/instagram';

export const getMediaScrapper = (url: string): MediaScrapper => {
  if (url.includes('instagram.com')) {
    return new InstagramScrapper(
      url,
      {
        cookie: process.env.INSTAGRAM_COOKIE as string,
        userAgent: process.env.INSTAGRAM_USER_AGENT as string,
        xIgAppId: process.env.INSTAGRAM_X_IG_APP_ID as string,
      }
    );
  }

  throw new Error('Cannot find scrapper for this url');
};
