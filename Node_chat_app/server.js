var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log("Connected...");
	socket.on('chat message', function(msg) {
		console.log('in server socket');
		io.emit('showto users', msg);
	});
});

http.listen(2000, function(){
	console.log("running local host on port 2000");
});