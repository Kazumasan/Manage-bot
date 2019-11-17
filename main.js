const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');
const fs = require('fs');       //later
const EmbedM = require('./editEmbed.js');
bot.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log("Loading....");

//creating command collection
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
};

//getting events
try {
    Events = JSON.parse(fs.readFileSync(config.eventLog).toString());
    console.log(`Found ${Object.keys(Events).length} Events: ${Object.keys(Events)}`);
} catch (err) {
    if (err.code == 'ENOENT') {
        fs.writeFileSync(config.eventLog, "{}");
        console.log("Caught ENOENT \r ------------------- Created New Event Log.");
    } else {
        console.log("Something went really BAD!");
        console.log(err)
    }
};

//getting ready
bot.once('ready', () => {
    console.log("Loaded. -----------------");
    console.log(`Config: \n Command Prefix: ${config.prefix} \n Bot Token: ${config.token}`);
});


bot.on('message', (message) => {
    // console.log("message")
    if (!message.content.startsWith(config.prefix) || message.author.bot) return false;
    args = message.content.substring(1).split("§");
    console.log(args)
    command = args[0];
    try {
        bot.commands.get(command).execute(message);
    } catch (err) {
        if (err) {
            console.log(err)
            message.channel.send("Ups Err...").then(message.delete());
        }
    } finally {
        message.delete()
    }

});

//emjois ➕➖❔

bot.on('messageReactionAdd', (reaction) => {
    user = reaction.users.last();
    if (Events[reaction.message.id]) {                  //see if reaction is on a Event stored in the eventLog
        if (user.id != config.botID) {                  //chekc that it wasn't the bot
            if (reaction._emoji.name == '➕') {         //check that it is the right emoji
                //check if user already exist in party
                var EOI = Events[reaction.message.id];

                for (i = 0; i < EOI.party.length; i++) {
                    if (EOI.party[i].id == user.id) {       //chek alternates <=========
                        console.log("Found User return False")
                        reaction.remove(reaction.users.last());
                        return false;
                    }
                }
                //resend Embed    
                reaction.message.edit(EmbedM.addMember(reaction.message.id, user))
                    .then(reaction.remove(reaction.users.last()));
            }else if (reaction._emoji.name == '➖') {         //check that it is the right emoji
                //check if user already exist in party
                var EOI = Events[reaction.message.id];

                for (i = 0; i < EOI.party.length; i++) {
                    if (EOI.party[i].id == user.id) {
                        console.log("Found User Proceed to Remove")
                        // =====================================          
                        //also check alternates and remove them from alternates 
                        // =====================================
                        reaction.message.edit(EmbedM.removeMember(reaction.message.id, user))
                            .then(reaction.remove(reaction.users.last()));
                    }
                }
            }else if (reaction._emoji.name == '❔') {         //check that it is the right emoji
                //check if user already exist in party
                var EOI = Events[reaction.message.id];

            }
        }
    }

});


bot.login(config.token);