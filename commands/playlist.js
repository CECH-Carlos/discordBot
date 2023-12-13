const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Ouça a melhor playlist de estudos"),

    async execute(interaction) {
        await interaction.reply("https://open.spotify.com/playlist/5IB8fVTkdeaEIN95tcNVTr?si=475cf6fdabca4fce");
    }
}