module.exports = {
        "Save" : (args, message, embed, reply) => {
            const {readFileSync, writeFileSync } = require('fs');
            const {eventLog} = require('./config.json')
            payload = {};
            
            payload.argString = message.content;
            payload.Creator = message.author;
            delete payload.Creator.lastMessage;
            delete payload.Creator.lastMessageID
            payload.Embed = embed;
            payload.args = args;
            if(args.lfg){
                payload.party = []
                payload.party.push(message.author);
            }
            if(args.alt){
                payload.alternates = []
            }

            try{
                Events = JSON.parse(readFileSync(eventLog).toString());
                console.log("Events Found");
                console.log("Try adding....");
                Events[reply.id] = payload;
                writeFileSync(eventLog, JSON.stringify(Events));
                console.log(`Sucessfully added Event : ${reply.id}`);
            }catch (err) {
                if(err.code == 'ENOENT'){
                    console.log("No Event File... Dafuq main prc... WhY!");
                }else{
                    console.log(err);
                }
            }
            
        },

        "Delete" : (messageID) => {
            const {readFileSync, writeFileSync} = require('fs');
            const {eventLog} = require('./config.json');
            try{
                Events = JSON.parse(readFileSync(eventLog).toString());
                console.log("Events in log: ", Object.keys(Events).length);
                console.log("deleting Events");
                delete Events[messageID];
                console.log("Done... Writing it down..")
                writeFileSync(eventLog, JSON.stringify(Events));
            }catch(err){
                if(err.code == "ENOENT"){
                    console.log("something stupid happened...");
                }else{
                    console.log(err);
                }
            }
        }
    }
