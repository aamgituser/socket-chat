import app from "./app.js";
import http from 'http';
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000
const config = {
    cors:{origin:'*'}
}

const server = http.createServer(app);
const httpServer = server.listen(PORT);
const io = new Server(httpServer,config);

io.on('connection',(socket)=>{
    console.log('conectado a web socket')
    socket.on('message:client',(message)=>{
        const newMessage = {
            id: socket.id,
            body: message
        }

        socket.broadcast.emit('message:server',newMessage)
    })
})