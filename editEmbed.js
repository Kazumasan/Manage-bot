//edit embed and resend it from herer

module.exports = {
    "addMember": (messageID, user) => {
        const { RichEmbed } = require('discord.js');
        const { readFileSync, writeFileSync } = require('fs');
        const { eventLog } = require("./config.json");
        Events = JSON.parse(readFileSync(eventLog).toString());
        EOI = Events[messageID];
        EOI.party.push(user);
        delete EOI.Embed.fields;
        newPartyString = []
        EOI.party.forEach((a) => {
            newPartyString.push(" " + a.username);
        });
        EOI.Embed.fields = []
        EOI.Embed.fields.push({
            "name": "Party",
            "value": newPartyString.toString(),
            "inline": false
        });
        writeFileSync(eventLog, JSON.stringify(Events));
        embed = new RichEmbed(EOI.Embed);
        return embed;
    },
    "removeMember": (messageID, user) => {
        const { RichEmbed } = require('discord.js');
        const { readFileSync, writeFileSync } = require('fs');
        const { eventLog } = require("./config.json");
        Events = JSON.parse(readFileSync(eventLog).toString());
        EOI = Events[messageID];
        if (EOI.party.find((x) => x.id == user.id)) {
            EOI.party.splice(EOI.party.findIndex((x) => x.id == user.id), 1);
            console.log("party after deletion", EOI.party);

        }
        if (EOI.alternates) {
            if (user.alternates.find((x) => x.id == user.id)) {
                delete EOI.alternates[EOI.alternates.findIndex((x) => x.id == user.id)];
            }
        }
        console.log(EOI.party, EOI.Embed);

        if (EOI.party.length != 0) {
            newPartyString = []
            EOI.party.forEach((a) => {
                newPartyString.push(" " + a.username);
            });
            EOI.Embed.fields = []
            EOI.Embed.fields.push({
                "name": "Party",
                "value": newPartyString.toString(),
                "inline": false
            });
        } else {
            EOI.Embed.fields = [];
        }
        writeFileSync(eventLog, JSON.stringify(Events));
        embed = new RichEmbed(EOI.Embed);
        console.log(embed)
        return embed;
    },
    "addAlternates": (messsageID, user) => {
        //check if alternates are allowed....
    }
}