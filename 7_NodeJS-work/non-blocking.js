var http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response){
  if(request.url == '\home') {
      fs.readFile('${ __dirname }/home.html', function(err, content) {
          if(!err) {
              response.setHeader('Content-type', 'text/html');
              response.write(content);
          } else {
              response.statusCode = 500;
              response.write('An error has occurred');
          }
          response.end();
      });
  } else {
      response.write('Hello World');
      response.end();
  }
});

server.listen(8080);