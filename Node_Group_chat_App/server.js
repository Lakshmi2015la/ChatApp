var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {	
	connections.push(socket);
	console.log("Connected: %s sockets connected", connections.length);
	
	//disconnect
	socket.on('disconnect', function(){
		if(!socket.username) return;		
		users.splice(users.indexOf(socket.username),1);
		connections.splice(connections.indexOf(socket),1)
	    console.log("Disconnected: %s sockets connected", connections.length);
	    
	
	});
	
	//send message
	socket.on('send message', function(data) {       	
		io.emit('new message', {'msg':data, 'user':socket.username});
	});
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUserNames();
		
	});
	
	function updateUserNames() {
	 io.emit('get users', users);
	}
});

server.listen(process.env.PORT || 2000);
console.log("Server running...on 2000");