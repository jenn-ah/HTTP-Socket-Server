const net = require('net');
const elements = require('./elements'); //do not need to put .js or .json, it automatically knows, if anything else need to add file ext

const PORT = process.env.PORT || 8080; //process is global obj, similar to window obj in browser;

const server = net.createServer((connectionRequest) => {
  connectionRequest.setEncoding('utf8');
  connectionRequest.on('data', (data) => {
    let contentType = 'text/html';
    
    let response = '';
    response = response.concat(`HTTP/1.1 200 OK\n`);
    response = response.concat(`Content-Type: ${contentType}\n`);
    response = response.concat(`\n`);


    let splitData = data.split(/\r\n|\r|\n/);
    let splitAgain = splitData[0].split();
    let splitThrice = splitAgain[0].split(' ');
    let finalSplit = splitThrice[1];
    console.log('finalSplit', finalSplit);
    console.log('splitData', splitData);
    //console.log('elem hydro', elements.hydrogen)
    
    if (finalSplit === 'hydrogen' || finalSplit === '/hydrogen' || finalSplit === '/hydrogen.html' || finalSplit === 'hydrogen.html') {
      let hydrogenResp = 'this is hydrogen';
      console.log(hydrogenResp);
      response = response.concat(`\n`);
      connectionRequest.write(elements.hydrogen);
      //connectionRequest.end();
      
    } else if (finalSplit === 'helium' || finalSplit === '/helium' || finalSplit === '/helium.html' || finalSplit === 'helium.html') {
      let heliumResp = 'this is helium';
      console.log(heliumResp);

      connectionRequest.write(elements.helium);
      //connectionRequest.end();
      
    } else if (finalSplit === '/' || finalSplit === '/index.html') {
      let indexResp = 'this is index';
      console.log(indexResp);

      connectionRequest.write(elements.index);
     // connectionRequest.end();
    } else if (finalSplit === '/css/styles.css' || finalSplit === 'css/styles.css') {
      let cssResp = 'this is css';
      console.log(cssResp);

      contentType = 'text/css';
      connectionRequest.write(elements.styles);
      //connectionRequest.end();
      
    } else {
      let _404Resp = 'this is 404';
      console.log(_404Resp);
      
      connectionRequest.write(elements._404);
    }
    connectionRequest.end();
    //process request and response here

    //concat head and body and send back
    // let response = '';
    // response = response.concat(`HTTP/1.1 200 OK\n`);
    // response = response.concat(`Content-Type: text/html\n`);
    // response = response.concat(`\n`);
    // response = response.concat(data);
    //console.log(response);
    //connectionRequest.write(response);
    //final step
    //connectionRequest.end();
  });
  connectionRequest.on('end', () => {
    console.log('Client disconnected');
  });

}); //everytime a socket connection is made to server, fire this function; socket or connection or request; this is where you process request

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});