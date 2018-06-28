const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname, 'protos', 'messages.proto')

const messageProto = grpc.load(PROTO_PATH).chatplug;

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

login().then(async client => {
  const username = await ask('Enter username [ChatPlugCLI]:') || 'ChatPlugCLI'
  rl.on('line', message => {
    client.sendMessage({
      message,
      attachments: [],
      author: { username },
      origin: { id: 'chatplugcli', service: 'grpc', name: 'ChatPlugCLI' },
    }, (err, response) => {
      if (err) return console.error(err)
      console.log(response)
    })
  })
})

async function login () {
  const host = await ask('Enter host [localhost]:') || 'localhost'
  const port = await ask('Enter port [2137]:') || '2137'
  return new messageProto.MessagesService(`${host}:${port}`, grpc.credentials.createInsecure())
}

function ask (question) {
  return new Promise(resolve => rl.question(question, resolve))
}
