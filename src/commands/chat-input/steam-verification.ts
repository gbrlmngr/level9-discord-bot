import { Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import axios from 'axios';
import { constructAuthenticationUrlForUser } from '../../lib/utilities/webhook';

@ApplyOptions<Command.Options>({
  name: 'verify-steam',
  description: 'Initiates the Steam verification flow',
  enabled: true,
})
export class VerifySteamSlashCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      return builder
        .setName(this.name)
        .setDescription(this.description)
    }, {
      idHints: ['']
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputInteraction) {
    await interaction.deferReply({ ephemeral: true });
    
    try {
      const authenticationUrl = constructAuthenticationUrlForUser(interaction.user.id);
      const steamOpsResponse = await axios.get(authenticationUrl);
      const url = steamOpsResponse?.data?.redirect_url ?? '';

      const dmChannel = await interaction.user.createDM();
      await dmChannel.send({
        content: `Hey, <@${interaction.user.id}>! To kickstart the Steam verification process, please visit the following link: ${url}.`
      });

      await interaction.editReply(`:partying_face: I've just sent you a direct message with the instructions!`);
    } catch (error: unknown) {
      this.container.logger.error('[VerifySteamSlashCommand: chatInputRun]', (error as Error).message);
      await interaction.editReply(`:cry: I couldn't send you a direct message. Please check your settings and then try again!`);
    }
  }
}
