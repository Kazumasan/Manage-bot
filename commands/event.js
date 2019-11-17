module.exports = {
    "name": "event",
    "descripton": "Create a New Event.",
    execute(message) {
        parser = require('yargs-parser');
        const EventM = require("./../EventM.js")
        const { RichEmbed } = require('discord.js');
        const thumbnails = [
            "https://media2.giphy.com/media/mJsImNkO2YSH6ssBpK/giphy.gif?cid=790b761104bfd621bee18912794eb63f506ea2c17ead1d68&rid=giphy.gif",
            "https://media0.giphy.com/media/nsHjVgedX9KoM/giphy.gif?cid=790b76110deaf07e081f0549694fcc41f3e674bb9ff4694b&rid=giphy.gif",
            "https://media2.giphy.com/media/TIxZ5JpOcmWWT3rfYz/giphy.gif?cid=790b7611c3099e9d647eb6cfc43c30e8698ee603b6a052b8&rid=giphy.gif",
            "http://giphygifs.s3.amazonaws.com/media/6lNp33YkcU43S/giphy.gif",
            "https://media.giphy.com/media/j3sY3hvOhMz9QriWQq/giphy.gif",
            "https://media1.giphy.com/media/dno7ecKFFfE5gQ62BW/giphy.gif?cid=790b76119445020415b17e1439d501711d6dc22b547ac111&rid=giphy.gif"
        ]
        args = parser(message.content.split("§")[1]);
        embed = new RichEmbed();
        embed.setFooter(`Created on: ${new Date().toLocaleString().substring(0, 17)}`);
        embed.setAuthor(message.author.username, "https://media1.giphy.com/media/dno7ecKFFfE5gQ62BW/giphy.gif?cid=790b76119445020415b17e1439d501711d6dc22b547ac111&rid=giphy.gif");
        embed.setColor('#1abc9c');
        if (args.thumb) {
            if (args.thumb == "random") {
                embed.setThumbnail(thumbnails[(Math.floor(Math.random() * (thumbnails.length + 1)))])
            } else if (args.thumb == true) {
                embed.setThumbnail("https://media2.giphy.com/media/3owypkjxtrXUvhJiCY/giphy.gif?cid=790b76115896ea8898b0d805e210629cf30cbb25ec50b40b&rid=giphy.gif")
            } else if (typeof args.thumb == 'string') {
                embed.setThumbnail(args.thumb);
            }
        }
        if (args.title) {
            if (args.desc) {
                embed.setTitle(args.title);
                embed.setDescription(args.desc);
                if (args.lfg) {
                    embed.addField('Party: ', message.author.username);
                }
                if (args.mention) {
                    //Do the mentioning ... dude...
                    console.log("Mentioning 1st stage", args.mention);
                }
            } else {
                message.channel.send("You have specified the --title but you didn't have a --desc...").then((message) => { message.delete(10000) });
                return false;
            }
        } else {    //easy way to create an event with less input but also boolean support;
            embed.setTitle('##Event##');
            embed.setDescription(args._.join(" "));
            if (args.lfg) {
                embed.addField('Party: ', message.author.username);
            }
            if (args.mention) {
                //Mentioning
                console.log("Mention from 2nd state", args.mention);
            }

        }
        message.channel.send(embed)
            .then((reply) => {
                EventM.Save(args, message, embed, reply)
                if (args.lfg) reply.react('➕').then(reply.react('➖'));
                if (args.alt) reply.channel.send("sry alts are not yet supported").then(message => message.delete(10000));//reply.react('❔')
            })

    }
}
//V1