

var http = require('http');
var url = require('url');

var User = function(userObj){
    this.fullname = userObj.fullname;
    this.handle = userObj.handle;
    return this;
};

var message = function(obj){
    this.message = obj.message;
    this.user = obj.user;
    this.timestamp = new Date();
};

var Status = function(message){
    this.code = 2;
    this.message = message;
}

var users = [];
var messages = [];

var server = http.createServer(function(request, response) {    

    var urlParse = url.parse(request.url, true);
    var urlPathname = urlParse.pathname;
    var query = urlParse.query;
        

    if(urlPathname === '/newMessage') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
         
        if ( query.addMessage ){ 
            try{
                var message = JSON.parse(query.addMessage);
                messages.push(new Message(message));
                response.end(JSON.stringify(message));
            }catch (e){
                response.end(new Status('Invalid JSON'))    
            }
            
        }else{
            response.end(new Status('Invalid Query Parameters'));
        }

    } else if (urlPathname === '/users'){
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        var usersList = {};
        usersList.Users = users;
        
        response.end(JSON.stringify(usersList));
    
    } else if (urlPathname === '/adduser'){
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        if (query.addNewUser){
            var user = new User(JSON.parse(query.addNewUser));
            users.push(user);
            response.end(JSON.stringify(user));
        }else{

            response.end(JSON.stringify(new Status('Invalid Query Parameter'));
        }
        
    } else {
        response.writeHead(404);
        response.end('404')
        
    }
}).listen(8088);


console.log('Server running on port 8088');



