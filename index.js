const path = require('path')
const grpc = require('grpc')
const PROTO_PATH = path.join(__dirname, 'messages.proto')

const messageProto = grpc.load(PROTO_PATH).chatplug;

const client = new messageProto.MessagesService(
  'localhost:2137',
  grpc.credentials.createInsecure()
)
client.sendMessage({
  message: 'Message sent from grpc api. Yay!',
  attachments: [],
  author: { username: 'ElonMusk' },
  origin: { id: 'dupa', service: 'grpc', name: 'rpcsamplethread' },
}, (err, response) => {
  if (err) return console.error(err)
  console.log(response)
})