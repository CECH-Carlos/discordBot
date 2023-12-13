const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, Component } = require("discord.js");

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma linguagem selecionada")
            .addOptions({
                label: "javascript",
                description: "Veja a documentação de Javascript",
                value: "javascript"
                },
                {
                    label: "python",
                    description: "Veja a documentação de Python",
                    value: "python"
                },
                {
                    label: "C#",
                    description: "Veja a documentação de C#",
                    value: "csharp"
                },
                {
                    label: "C++",
                    description: "Veja a documentação de C++",
                    value: "cplusplus"
                },
                {
                    label: "discord.js",
                    description: "Veja a documentação de Discord.js",
                    value: "discordjs"
                },
                {
                    label: "typescript",
                    description: "Veja a documentação de Typescript",
                    value: "typescript"
                },
                {
                    label: "Ruby",
                    description: "Veja a documentação de Ruby",
                    value: "ruby"
                }
            )
    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação da tecnologia que quiser"),

    async execute(interaction) {
        await interaction.reply({content: "Selecione uma das techs abaixo:", components: [row]});
    }
}