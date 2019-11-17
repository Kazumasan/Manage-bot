module.exports = {
    "name": "delete",
    "descripton": "delete an existing event from the snowflake.",
    execute(message) {
        const EventM = require("./../EventM.js");
        fs = require('fs');
        args = message.content.split("§")
        message.channel.fetchMessage(args[1]).then((message)=>{
            message.delete().then(EventM.Delete(args[1]))
        }).catch(console.error)
    }   
}