import 'dotenv/config';

import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { isActionAllowed } from './services/permissions';
import { getMediaScrapper } from './services/scrapper';

const { BOT_TOKEN } = process.env;

if (!BOT_TOKEN) {
  throw new Error('`BOT_TOKEN` must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);

bot.command('start', async (ctx) => {
  console.debug('On "start"', ctx);

  if (!isActionAllowed(ctx.update.message.from.username)) {
    return;
  }

  await ctx.reply('Hello there 👋');
});

bot.on('inline_query', async (ctx) => {
  console.debug('On "inline_query"', ctx);

  if (!isActionAllowed(ctx.update.inline_query.from.username)) {
    return;
  }

  const query = (ctx.update.inline_query.query || '').replace(' ', '');

  console.debug('Inline query', query);

  if (!query) {
    console.debug('Empty query');

    return ctx.answerInlineQuery([]);
  }

  try {
    const mediaScrapper = getMediaScrapper(query);
    const media = await mediaScrapper.getMedia();

    if (!media) {
      return ctx.answerInlineQuery([
        {
          type: 'article',
          id: '1',
          title: 'Cannot get media',
          input_message_content: {
            message_text: 'Cannot get media',
          },
        }
      ]);
    }

    return ctx.answerInlineQuery([media]);
  } catch (error) {
    console.error(error);

    return ctx.answerInlineQuery([
      {
        type: 'article',
        id: '1',
        title: 'Error occurred',
        input_message_content: {
          message_text: 'Error occurred',
        },
      }
    ]);
  }
});

bot.on(message('text'), async (ctx) => {
  console.debug('On "text"', ctx);

  if (!isActionAllowed(ctx.message.from.username)) {
    return;
  }

  await ctx.reply('I can\'t understand you 🤔');
});

bot.command('leave', async (ctx) => {
  console.debug('On "leave"', ctx);

  if (!isActionAllowed(ctx.message.from.username)) {
    return;
  }

  await ctx.reply('See ya 👋');
});

bot.launch();

console.info('Bot started');

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))