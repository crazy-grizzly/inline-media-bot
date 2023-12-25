import type { InlineQueryResult } from 'telegraf/types';

export interface MediaScrapper {
  getMedia: () => Promise<InlineQueryResult | null>;
}