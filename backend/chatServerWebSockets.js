var io = require('socket.io').listen(8088,{origins: '*:*'});
var userList = [];

io.sockets.on('connection', function(socket){
    
    socket.on('newUser', function(data){
        userList.push(data.user);
        socket.broadcast.emit('message', {
            user: "Node",
            timestamp: new Date(),
            message: data.user + " has joined the room",
            messageType: 'system'
        });
        socket.emit('userList', {
            users: userList
        });
        socket.broadcast.emit('userList', {
            users: userList
        });
    });

    socket.on('message', function(data){
        var message = {
            user: data.user,
            timestamp: new Date(),
            message: data.message,
            messageType: 'user'
        };
        socket.emit('message', message) 
        socket.broadcast.emit('message', message);
    });

    socket.on('leaving', function(data){
        var idx = userList.indexOf(data.user);
        if (idx !== -1){
            userList.splice(idx, 1);
            socket.broadcast.emit('userList', {
                users: userList
            });
            socket.broadcast.emit('message', {
                user: "Node",
                timestamp: new Date(),
                message: data.user + " has left the room",
                messageType: 'system'
            });
        }
    });

});