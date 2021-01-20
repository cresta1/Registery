const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const moment = require('moment');
const client = new Discord.Client();
const {DatabaseManager,Database} = require('@aloshai/mongosha')

///FORCEX TARAFINDAN KODLANDI ❤️ 
 DatabaseManager.connect("MONGODB_URL_")


client.aliases = new Discord.Collection();

fs.readdirSync('./Commands').forEach(a => {
    const commandFiles = fs.readdirSync(`./Commands/${a}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
      const komutlar = require(`./Commands/${a}/${file}`);
    
      komutlar.configuration.CommandName.forEach(alias => {
          console.log(`[Commands] : ${alias}`)
        client.aliases.set(alias,komutlar);
      });
    }
  }) 

client.on("ready",  async() => {
  console.log("Forcex ❤️ ")
  client.user.setPresence({activity: {name: config.presence"}})
})

    client.login(config.token);

    client.on("message", async(message) => {
      let client = message.client;
      if (message.author.bot) return;
      if (!message.content.startsWith(config.prefix)) return;
      let command = message.content.split(' ')[0].slice(config.prefix.length);
      let params = message.content.split(' ').slice(1);
      let cmd;
      if (client.aliases.has(command)) {
        cmd = client.aliases.get(command);
      } else{
        return;
      }
        cmd.run(client, message, params);
    })





















































    
///ellemeyin bozulur.
Discord.TextChannel.prototype.forcex = async function(a,channel) {
let Channel = client.channels.cache.get(channel);
Channel.send(a)
}
