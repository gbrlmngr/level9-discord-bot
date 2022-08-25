import { formatDistance } from "date-fns";
import { MessageEmbed } from "discord.js";
import { Configuration } from "../configuration";

interface IConstructSteamVerificationEmbedParams {
  userId: string;
  steamData: Partial<{
    steamid: string;
    username: string;
    profile: string;
    avatar: string;
  }>;
  timestamp: number;
}

export function constructSteamVerificationEmbed({
  userId = '',
  steamData = {},
  timestamp = 0,
}: IConstructSteamVerificationEmbedParams) {
  const { steamid = '', username = '', profile = '', avatar = '' } = steamData;
  const embed = new MessageEmbed();

  embed.setColor('GREEN');
  embed.setAuthor({
    name: 'Steam verification system',
    iconURL: avatar
  });
  embed.setTitle(`Verification completed successfully!`)
  embed.setDescription(`:tada: Congratulations, <@${userId}>!\nYour steam account is now verified on our systems.\n[What does that mean?](${Configuration.Webhook.SteamVerification.FAQUrl})`);
  embed.setFields([
    { name: 'Steam profile', value: `[${username} (${steamid})](${profile})` }
  ]);
  embed.setFooter({
    text: `Verified ${formatDistance(
      timestamp,
      Date.now(),
      { addSuffix: true, includeSeconds: true }
    )}.`
  });

  return embed;
}
