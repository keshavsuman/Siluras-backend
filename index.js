const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const {Server} = require('socket.io');
const {createServer} = require('http');
const SocketEvents = require('./sockets/sockets');
const MemCache = require('./sockets/memcache');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true },()=>{
    console.log("Database connected");
});

app.use('/api',routes);

const httpServer = createServer(app);
const io = new Server(httpServer,{
    transports: ["websocket", "polling"],
});

const client = io.of('/call');

// client.use(async (socket,next)=>{
//     const user = jsonwebtoken.verify(socket.handshake.auth.token,process.env.SECRET);
//     socket.user = user;
//     next();
// })

client.on("connection",(socket)=>{
    console.log("socket connected");
    // MemCache.hset(socket.user._id,socket.id);
    const socketEvents = new SocketEvents();
    socketEvents.init(client,socket);
});

httpServer.listen(process.env.PORT, () => console.log('Server started on port '+process.env.PORT));

