const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());

// Server configuration
const server = http.createServer(app);
const socketIO = new Server(server, {
    cors: { 
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"] 
    }  
});
let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} logged-in user!`);
  
    // Send message event
    socket.on(`message`, (data) => {
        console.log(`⚡: message sent!`);
        
        socketIO.emit(`messageResponse-${data.to}`, data);
    });

    // Event to notify when a user is typing
    socket.on('typing', (data) => {
        console.log(`⚡: user is typing!`);
        socketIO.emit(`typingResponse`, data);
    });

    // Event to notify a user that you are logging in
    socket.on('newUserLogin', (data) => {
        console.log(`⚡: logged-in user!`);
        
        const exist = users.find((user) => user.socketID === data.socketID);
        if(!exist){
            users.push(data)
        } else {
            exist.online = true;
        }
        socketIO.emit('newUserResponse', {user:data, list: users});
    });
    
    // Event to notify a user who logs out
    socket.on('disconnectUser', (data) => {
        console.log(`⚡: user offline!`);
        const user = users.find((user) => user.socketID === data.socketID);
        if(user){
            user.online = false;
        }
        //Sends the list of users to the client
        socketIO.emit('newUserResponse',  {user:data, list: users});
    });
  
    // Event to notify a user who disconnects from the server.
    socket.on('disconnect', () => {
        console.log(`⚡: user offline!`);

        //users = []
        //socket.disconnect();
    });
});

// Start server
server.listen(4000, () => {
  console.log("listening on *:4000");
});