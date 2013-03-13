var io = require('socket.io').listen(8088,{origins: '*:*'});

io.sockets.on('connection', function(socket){
        
    socket.broadcast.emit('message', {
        user: "Node",
        timestamp: new Date(),
        message: "A user joined the room"
    });

    socket.on('message', function(data){

        var message = {
            user: data.user,
            timestamp: new Date(),
            message: data.message
        };

        socket.emit('message', message) 
        socket.broadcast.emit('message', message);

    });

});