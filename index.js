const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const socketIO = new Server(server, {
    cors: { 
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"] 
    }  
});
let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} usuario conectado!`);
  
    // Evento de enviar un mensaje
    socket.on(`message`, (data) => {
        console.log(`⚡: mensaje enviado!`);
        
        socketIO.emit(`messageResponse-${data.to}`, data);
    });

    // Evento de notificar cuando un usuario esta escribiendo
    socket.on('typing', (data) => {
        console.log(`⚡: usuario esta escribiendo!`);
        socketIO.emit(`typingResponse`, data);
    });

    // Evento de notificar un usuario que inicias sesión en el servidor
    socket.on('newUser', (data) => {
        console.log(`⚡: usuario conectado!`);
    });

    // Evento de notificar un usuario que inicias sesión
    socket.on('newUserLogin', (data) => {
        console.log(`⚡: usuario conectado!`);
        
        const exist = users.find((user) => user.socketID === data.socketID);
        if(!exist){
            users.push(data)
        } else {
            exist.online = true;
        }
        socketIO.emit('newUserResponse', {user:data, list: users});
    });
    
    // Evento de notificar un usuario que cierra sesión
    socket.on('disconnectUser', (data) => {
        console.log(`⚡: usuario desconectado!`);
        const user = users.find((user) => user.socketID === data.socketID);
        if(user){
            user.online = false;
        }
        //Sends the list of users to the client
        socketIO.emit('newUserResponse',  {user:data, list: users});
    });
  
    // Evento de notificar un usuario que cierra sesión en el servidor
    socket.on('disconnect', () => {
        console.log(`⚡: usuario desconectado!`);

        //users = []
        //socket.disconnect();
    });
});


server.listen(4000, () => {
  console.log("listening on *:4000");
});