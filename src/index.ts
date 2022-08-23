import { LogLevel, SapphireClient } from '@sapphire/framework';
import { config } from 'dotenv-cra';

import 'reflect-metadata';
import '@sapphire/plugin-logger/register';

process.env.NODE_ENV ??= 'development';
config();

const discordClient = new SapphireClient({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_TYPING',
  ],
  logger: {
    level: LogLevel.Debug,
  },
  loadMessageCommandListeners: true,
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