const net = require('net');
const elements = require('./elements'); //do not need to put .js or .json, it automatically knows, if anything else need to add file ext

const PORT = process.env.PORT || 8080; //process is global obj, similar to window obj in browser;

const server = net.createServer((connectionRequest) => {
  connectionRequest.setEncoding('utf8');
  connectionRequest.on('data', (data) => {
    let contentType = 'text/html';
    let reasonPhrase = '1.1 200 OK';

    let response = '';
    response = response.concat(`HTTP/${reasonPhrase}\n`);
    response = response.concat(`Content-Type: ${contentType}\n`);
    response = response.concat(`\n`);


    let splitData = data.split(/\r\n|\r|\n/);
    let splitAgain = splitData[0].split();
    let splitThrice = splitAgain[0].split(' ');
    let finalSplit = splitThrice[1];
    console.log('finalSplit', finalSplit);

    if (finalSplit === 'hydrogen' || finalSplit === '/hydrogen' || finalSplit === '/hydrogen.html' || finalSplit === 'hydrogen.html') {

      response = response.concat(elements.hydrogen);
      console.log('hydro', response);
      connectionRequest.write(response);

    } else if (finalSplit === 'helium' || finalSplit === '/helium' || finalSplit === '/helium.html' || finalSplit === 'helium.html') {

      response = response.concat(elements.helium);
      console.log('helium', response);
      connectionRequest.write(response);

    } else if (finalSplit === '/' || finalSplit === '/index.html' || finalSplit === 'index') {

      response = response.concat(elements.index);
      console.log('index', response);
      connectionRequest.write(response);

    } else if (finalSplit === '/css/styles.css' || finalSplit === 'css/styles.css') {

      contentType = 'text/css';
      // connectionRequest.setContentType("text/css");
      response = response.concat(elements.styles);
      console.log('cssRes', response);
      connectionRequest.write(response);

    } else {

      reasonPhrase = '1.0 404 Not Found';
      response = response.concat(elements._404);
      console.log('404res', response);
      connectionRequest.write(response);
    }
    return connectionRequest.end();

    // let response = '';
    // response = response.concat(`HTTP/1.1 200 OK\n`);
    // response = response.concat(`Content-Type: text/html\n`);
    // response = response.concat(`\n`);
    // response = response.concat(data);

  });
  connectionRequest.on('end', () => {
    console.log('Client disconnected');
  });

});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});