import { InstagramScrapper } from './instagram';

describe('Instagram Scrapper Adapter', () => {
  const checkScrapperSuccessForUrl = async (url: string) => {
    const igMediaScrapper = new InstagramScrapper(
      url,
      {
        cookie: process.env.COOKIE as string,
        userAgent: process.env.USER_AGENT as string,
        xIgAppId: process.env.X_IG_APP_ID as string,
      },
    );
    const actualMedia = await igMediaScrapper.getMedia();

    if (!actualMedia) {
      throw new Error('Cannot get media');
    }

    expect(actualMedia.type).toBe('video');
    expect(actualMedia.id).toBe('1');
    expect(actualMedia.mime_type).toBe('video/mp4');
    expect(typeof actualMedia.title).toBe('string');
    expect(typeof actualMedia.video_url).toBe('string');
  };
  const checkScrapperErrorForUrl = async (url: string, message: string) => {
    const igMediaScrapper = new InstagramScrapper(
      url,
      {
        cookie: process.env.COOKIE as string,
        userAgent: process.env.USER_AGENT as string,
        xIgAppId: process.env.X_IG_APP_ID as string,
      },
    );

    await expect(igMediaScrapper.getMedia()).rejects.toThrow(message);
  };

  it('should not get media from invalid url', async () => {
    // NOTE: Wrong path (without /reel/ or /p/)
    const invalidUrl = 'https://www.instagram.com/CT0JwkLdX8/?utm_source=ig_web_copy_link';
    // NOTE: Wrong domain
    const invalidUrl1 = 'https://www.instgram.com/CT0JwkLdX8/?utm_source=ig_web_copy_link';
    // NOTE: Empty id with /p/ path
    const invalidUrl2 = 'https://www.instagram.com/p//?utm_source=ig_web_copy_link';
    // NOTE: Empty id with /reel/ path
    const invalidUrl3 = 'https://www.instagram.com/reel//?utm_source=ig_web_copy_link';

    await checkScrapperErrorForUrl(invalidUrl, 'Invalid url');
    await checkScrapperErrorForUrl(invalidUrl1, 'Invalid url');
    await checkScrapperErrorForUrl(invalidUrl2, 'Invalid url');
    await checkScrapperErrorForUrl(invalidUrl3, 'Invalid url');
  });

  it('should get media from valid url', async () => {
    const validUrl = 'https://www.instagram.com/reel/C0t0JwkLdX8/?utm_source=ig_web_copy_link';
    const validUrl1 = 'https://www.instagram.com/p/C0t0JwkLdX8/?utm_source=ig_web_copy_link';

    await checkScrapperSuccessForUrl(validUrl);
    await checkScrapperSuccessForUrl(validUrl1);
  });
});
