import { ApiRequest, ApiResponse, Route, methods } from '@sapphire/plugin-api';
import { ApplyOptions } from '@sapphire/decorators';
import { StatusCodes } from 'http-status-codes';
import { verifyHMAC256Signature } from '../lib/utilities/crypto';
import { Webhook } from '../lib/constants';
// import { MessageEmbed, TextChannel } from 'discord.js';
// import { format } from 'date-fns';

@ApplyOptions<Route.Options>({
  route: 'steam-verification',
})
export class SteamVerificationRoute extends Route {
  public async [methods.POST](req: ApiRequest, res: ApiResponse) {
    try {
      const isWebhookSignatureValid = verifyHMAC256Signature(
        JSON.stringify(req.body),
        req.headers[Webhook.Headers.Timestamp] as string,
        req.headers[Webhook.Headers.Signature] as string
      );

      if(!isWebhookSignatureValid) {
        res.status(StatusCodes.PRECONDITION_FAILED).json({});
        return;
      }
      
      // /* TODO: Apply a rate limiter */
      // const { identity, payload, timestamp } = req.body as any;
      // const userId = identity.replace('user:', '');

      // /* TODO: Move hardcoded IDs to .env */
      // const guild = this.container.client.guilds.cache.get('1010555613740277792');
      // const role = guild?.roles.cache.get('1011749055770132560');
      // const user = await guild?.members.fetch(userId);

      // /* TODO: Give the role only if the user doesn't already have it */
      // await user?.roles.add([role!]);

      // /* TODO: Send the message as DM instead of a public one */
      // const channel = this.container.client.channels.cache.get(process.env.STEAM_VERIFICATION_WEBHOOK_CHANNEL_ID!);
      // const embed = new MessageEmbed();
      // embed.setColor('GREEN');
      // embed.setTitle(':white_check_mark: Steam verification completed!');
      // embed.setDescription(`You have successfully verified your Steam account, <@${userId}>.\nYou have received the <@&${role!.id}> role.`);
      // embed.setFields([
      //   { name: 'Steam ID', value: payload.steamid, inline: true },
      //   { name: 'Verified at', value: format(timestamp, 'yyyy-MM-dd @ HH:mm'), inline: true }
      // ]);
      // embed.setTimestamp(Date.now());
      // (channel as TextChannel).send({ embeds: [embed] });

      res.status(StatusCodes.OK).json({});
    } catch (error: unknown) {
      this.container.logger.error('[SteamVerificationRoute: POST]', (error as Error).message);
      res.status(StatusCodes.BAD_GATEWAY).json({});
    }
  }
}