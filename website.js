var http = require('http');
var console = require('console')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Ur moms a hoe');
}).listen(8080);

console.log("Hello World")