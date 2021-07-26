
const login = require("facebook-chat-api");

// Create simple echo bot
const fs = require("fs");
var hello=["Bonjour","Bonsoir","Salut","Hello","Yo","Coucou","bonjour","bonsoir","salut","hello","yo","coucou"]
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
                console.log("Reaction send to "+ message.body);
            }
        })
        if(message.body!=undefined){
            for(let val of hello){

                if(message.body.search(val)!==-1 ) {
                    console.log("Envoi coucou");
                    var msg = {attachment: fs.createReadStream(__dirname + '/assets/Coucou2.mp3')}
                    api.sendMessage(msg, message.threadID);
                }
            }
            if(message.body.search("Chante")!=-1 ||message.body.search("chante")!=-1){
                var msg={
                    body: "Je chante pour toi",
                    attachment:fs.createReadStream(__dirname + '/assets/brocolis.mp3')
                }
                console.log("Envoi chante");
                api.sendMessage(msg, message.threadID);

            }

        }


    });
});



