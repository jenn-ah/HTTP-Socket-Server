const net = require('net');

const PORT = process.env.PORT || 8080; //process is global obj, similar to window obj in browser;

const server= net.createServer((connectionRequest) => {
  console.log('client connected');
}); //everytime a socket connection is made to server, fire this function; socket or connection or request; this is where you process request

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});