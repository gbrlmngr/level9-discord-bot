import { LogLevel, SapphireClient } from '@sapphire/framework';
import { config } from 'dotenv-cra';

import 'reflect-metadata';
import '@sapphire/plugin-logger/register'
import '@sapphire/plugin-api/register';

process.env.NODE_ENV ??= 'development';
config();

const discordClient = new SapphireClient({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_TYPING',
  ],
  logger: {
    level: process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug,
  },
  loadMessageCommandListeners: true,
  api: {
    prefix: 'v1/',
    listenOptions: {
      port: Number(process.env.APPLICATION_PORT),
    }
  }
});

async function main() {
  try {
    discordClient.logger.info(`Discord client is logging in...`);
    await discordClient.login();
    discordClient.logger.info(`Discord client successfully logged in!`);
  } catch (error: unknown) {
    discordClient.logger.fatal(`Unable to log in due to:`, (error as Error).message);
    discordClient.destroy();
    process.exit(1);
  }
}

main();