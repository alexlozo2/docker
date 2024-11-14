const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'jmsaxd',
    password: 'oauth:1po7ewx6u5a2kceybtm58p9d6v1i7m'
  },
  channels: [
    'jmsaxd',
    'RenRize'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);


// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();
  
    // If the command is known, let's execute it
    if (commandName == '!hola') {
      
      client.say(target, `¡Hola! Bienvenido ${context.username}`);
      console.log(`* Executed ${commandName} command`);
  }else{
    client.say(target, `puto`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}