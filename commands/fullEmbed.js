module.exports = {
    "name": "fullEmbed",
    "descripton": "Create a New Event.",
    execute(message) {
        const { readFileSync, writeFileSync } = require('fs')
        const parser = require('yargs-parser');
        const { RichEmbed } = require('discord.js');
        obj = {}
        args = message.content.split("§");
        parsed = parser(args[1]);
        delete parsed._
        console.log(parsed)

        embed = new RichEmbed();

        for (k in parsed) {
            if (typeof parsed[k] == 'object') {
                embed[k](...parsed[k])
            } else {
                embed[k](parsed[k])
            }
        }

        obj.channel_id = message.channel.id;
        obj.server_id = message.guild.id;
        obj.server_name = message.guild.name
        obj.args = parsed


        Events = JSON.parse(readFileSync("./events.json"));
        Events[message.id] = obj;
        writeFileSync("./events.json", JSON.stringify(Events))
        message.channel.send(embed);
    }
}