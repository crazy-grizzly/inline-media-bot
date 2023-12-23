import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { isActionAllowed } from './services/permissions';
import { isValidUrl } from './services/validation';

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

  const { query } = ctx.update.inline_query;

  if (!isValidUrl(query)) {
    return;
  }

  // TODO: Do the URL retrieval logic
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
  // TelegramError: 400: Bad Request: chat member status can't be changed in private chats
  // await ctx.leaveChat();
});

bot.launch();

console.info('Bot started');

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))