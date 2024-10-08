 
import {
    ApplicationCommandType,
    EmbedBuilder,
    GuildMember,
    InteractionContextType,
    UserContextMenuCommandInteraction
} from 'discord.js';
import { ContextMenuCommand, ExtraColor } from '../../../Classes/index.js';
import { localize } from '../../../bot.js';

// Locale Namespace
const ns = 'avatar';

// Example user context menu

export default new ContextMenuCommand()
    .setBuilder((builder) => builder
        .setName('Display Avatar')
        .setNameLocalizations(localize.discordLocalizationRecord('command-name', ns))
        .setType(ApplicationCommandType.User) // Specify the context menu type
        // Allows command to be used in DMs, servers and group DMs
        .setContexts(InteractionContextType.Guild))
    .setExecute(async (interaction: UserContextMenuCommandInteraction) => {
        const member = interaction.targetMember as GuildMember;
        const embed = new EmbedBuilder()
            .setTitle(localize.t('embed', ns, interaction.locale, { 'username': member.displayName }))
            .setImage(member.displayAvatarURL({ size: 4096 }))
            .setColor(ExtraColor.EmbedGray)
            .setFooter({ text: `ID: ${member.id}` });
        return interaction.reply({ embeds: [embed] });
    });