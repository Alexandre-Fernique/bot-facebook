
const login = require("facebook-chat-api");

// Create simple echo bot
const fs = require("fs");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
    api.listenMqtt((err, message) => {
        if(message.mentions!=undefined)
        {
            if(Object.keys(message.mentions).indexOf("100064795671628")!=-1){
                console.log(message.mentions);
                api.sendMessage("TKT - Des Brocolis\n https://www.youtube.com/watch?v=xVL29dVdLN4", message.threadID);
            }
        }


        api.setMessageReaction(decodeURIComponent("🍆"),message.messageID,(err)=>{
            if(err) return console.error(err);
            else {
                if(message.body)
                console.log("Resaction send to "+ message.body);
            }
        })

    });
});



