const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

//dotenv
const dotenv = require("dotenv");
const { error } = require("node:console");
dotenv.config();
const { TOKEN } = process.env;

//importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`Esse comando em ${filePath} esta´com "data" ou "execute" ausentes`)
  }
}

console.log(client.commands)


//login do bot
client.once(Events.ClientReady, (c) => {
  console.log(`Pronto! Login realizado como ${c.user.tag}`);
});
client.login(TOKEN);

//listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>{
    if(interaction.isStringSelectMenu()){
        const selected = interaction.values[0];
        if(selected == 'javascript'){
            await interaction.reply('Documentação do JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript');
        } else if(selected == 'python'){
            await interaction.reply('Documentação do Python por versão: https://www.python.org/doc/versions/');
        } else if(selected == 'csharp'){
            await interaction.reply('Documentação do C#: https://learn.microsoft.com/pt-br/dotnet/csharp/');
        } else if(selected == 'cplusplus'){
            await interaction.reply('Documentação do C++: https://devdocs.io/cpp/ \n ou pela documentação original do C++: https://cplusplus.com/doc/');
        } else if(selected == 'discordjs'){
            await interaction.reply('Documentação do Dsicord.js: https://discord.js.org/docs/packages/discord.js/main');
        } else if(selected == 'typescript'){
            await interaction.reply('Documentação do Typescript: https://www.typescriptlang.org/pt/docs/handbook/typescript-in-5-minutes.html');
        } else if(selected == 'ruby'){
            await interaction.reply('Documentação do Ruby: https://www.ruby-lang.org/en/documentation/');
        }
        
    }
    if(!interaction.isChatInputCommand()) return 
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error('Comando não encontrado');
        return
    }
    try {
        await command.execute(interaction);
    }
    catch(error) {
        console.error(error)
        await interaction.reply('Houve um erro ao executar esse comando!')
    }
})