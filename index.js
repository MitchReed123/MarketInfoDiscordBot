const discord = require("discord.js");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const apiToken = process.env['apiToken']
const mySecret = process.env['TOKEN'];

const client = new discord.Client();

function getStats(cats){
  const url = `https://finnhub.io/api/v1/news?category=${cats}&token=${apiToken}`;
  return fetch(url).then((res) => {return res.json()}).then((data) => {

    for(i = 0; i <= 10; i++){

      var articleNum = Math.floor(Math.random() * 11);

      console.log(data[articleNum]);
      //for testing and seeing if data is being given back if something isnt working...
      const testingthis = data[articleNum].datetime;
      const working = testingthis * 1000;
      const dateObject = new Date(working).toLocaleString();
      const headline = data[articleNum].headline;
      const category = data[articleNum].category;
      const summary = data[articleNum].summary;
      const source = data[articleNum].source;
      const url = data[articleNum].url;
      const attachment = new MessageAttachment(data[articleNum].image);
      // console.log(dateObject);

      return data[articleNum];
    }
  });
}


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {

  var categories = ["General", "Forex", "Crypto", "Merger"];

  if(msg.author.bot) return;
  console.log(msg.content);
  if(msg.content === "categories")
  {
    msg.channel.send("Category Types are: General, Forex, Crypto, Merger");
  }
  if(msg.content === 'Forex News')
  {
    var typeArray = msg.content.split(" ");
    if(categories.includes(typeArray[0]))
    {
      getStats(typeArray[0].toLowerCase()).then(info => msg.reply( `Headline: ${info.headline}\nSummary: ${info.summary}\nSource: ${info.source}\nURL: ${info.url}\n`));

    }
  } else if(msg.content === "Crypto News")
  {
    var cryptoArray = msg.content.split(" ");
    if(categories.includes(cryptoArray[0]))
    {
      getStats(cryptoArray[0].toLowerCase()).then(info => msg.reply( `Headline: ${info.headline}\nSummary: ${info.summary}\nSource: ${info.source}\nURL: ${info.url}\n`));
    }
  } else if(msg.content === "General News")
  {
    var generalArray = msg.content.split(" ");
    if(categories.includes(generalArray[0]))
    {
      getStats(generalArray[0].toLowerCase()).then(info => msg.reply( `Headline: ${info.headline}\nSummary: ${info.summary}\nSource: ${info.source}\nURL: ${info.url}\n`));
    }
  }else if(msg.content === "Merger News")
  {
    var mergerArray = msg.content.split(" ");
    if(categories.includes(mergerArray[0]))
    {
      getStats(mergerArray[0].toLowerCase()).then(info => msg.reply( `Headline: ${info.headline}\nSummary: ${info.summary}\nSource: ${info.source}\nURL: ${info.url}\n`));
    }
  } else {
    msg.reply(`No Category exists with the name: ${msg.content}`);
  }
  if(msg.content === 'ping')
  {
    msg.reply('pong');
  }
});

client.login(mySecret);


