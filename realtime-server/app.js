var app = require('http').createServer(handler)
var io = require('socket.io').listen(app);
var fs = require('fs');
var redis = require('redis').createClient();
redis.subscribe('rt-change');

app.listen(3001);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  redis.on('message', function(channel, message){
    socket.emit('rt-change', JSON.parse(message));
  });  
});