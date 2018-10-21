
const net = require('net');
//const EventEmitter = require('events');
//const PORT = process.env.PORT || 8080;
const myPort = 80;

const host = process.argv[2];
const client = net.createConnection(myPort, host, () => {
  console.log('server is connected');
});
let date = new Date();
let rfcDate = date.toUTCString();
let uriVar = '/';
let getHead = 
  `GET ${uriVar} HTTP/1.1 200 OK\n 
  Date: ${rfcDate}\n 
  Host: ${host}\n 
  User-Agent: LEJENND 1.0\r\n\r\n`;
client.write(getHead);
console.log(getHead);




client.on('data', (data) => {
  console.log('this is my data', data);
  
});





//client.destroy();