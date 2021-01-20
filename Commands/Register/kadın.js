const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has(config.mod.reg)) return message.channel.send("Bu komutu kullanmaya yeterli yetkin yok")

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!harry) return message.reply("!Hata, bir kullanıcı etiketlemelisin.");

let name = args[1];
let age = args[2];
if(!name) return message.channel.forcex("Kayıt edilcek kullanıcın ismini girmelisin.",message.channel.id);
if(isNaN(age)) return message.channel.forcex("Yaş girmeyi unuttun!",message.channel.id)

await registerdb.add(`reg.${harry.id}.kız`,1);
await registerdb.add(`stat.${message.author.id}.kız`,1);
await registerdb.push(`register.${harry.id}`,{
    user: harry.id,
    mod: message.author.id,
    duration: Date.now(),
    name: name,
    age: age
});

harry.roles.cache.has(config.roles.booster) ? harry.roles.set([config.roles.erkek,config.roles.booster]) : harry.roles.set([config.roles.erkek])
harry.setNickname(`${config.sembol.tag} ${name} ${age}`)

let embed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
.setDescription(`
${harry} adlı kişi <@${message.author.id}> tarafından **Kız** olarak kaydedildi.`)
.setTimestamp()
message.channel.send(embed)

};

exports.configuration = {
  CommandName: ["k","kadın","kız"],
  description: "kız olarak kayıt eder.",
  usage: "k @Member <isim> <yaş>"
};
