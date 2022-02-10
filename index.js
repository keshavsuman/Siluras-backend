const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const {Server} = require('socket.io');
const {createServer} = require('http');

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://admin:siluras_7272@siluras.com:27017/doctor', { useNewUrlParser: true },()=>{
    console.log("Database connected");
});

app.use('/api',routes);

const httpServer = createServer(app);
const io = new Server(httpServer,{
    transports: ["websocket", "polling"],
});

io.of('/call').use(async (socket,next)=>{
    console.log("socket connected");
    next();
}).on("connection",(socket)=>{
    console.log("socket connected");
    // socket.on("")
});

httpServer.listen(9000, () => console.log('Server started on port 9000'));

