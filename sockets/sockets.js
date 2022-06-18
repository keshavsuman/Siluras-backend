const Agora = require('./agora');
const uuid = require('uuid4');
const MemCache = require('./memcache');
const jsonwebtoken = require('jsonwebtoken');

class SocketEvents {
    
    //  agora = new Agora();
     nsp;
     socket;

    init(nsp, socket) {
        this.nsp = nsp;
        this.socket = socket;
        this.listenEvents();
    }

    listenEvents() {
        this.login();
        this.connectCall();
        this.acceptCall();
        this.rejectCall();
        this.onCallRequest();
    }

    /**
     * @param id // other user id
     * use to connect call
     */
     connectCall() {
        this.socket.on("connectCall", async (data) => {
            const me = this.socket.user._id;
            // data.channel = uuid.v1();
            // data.token = await this.agora.generateToken(data.channel);
            const recSocket = MemCache.hget(data.remoteUserId);
            this.socket.emit('connectCall',data);
            if (recSocket) {
                data.id = me;
                this.nsp.to(recSocket).emit("onCallRequest", data);
            }
        })
    }

    /**
     * @description Login with token to link socketId with userId
     */
    login(){
        this.socket.on('login',async (data)=>{
            const {token} = data;
            const user = jsonwebtoken.verify(token,process.env.SECRET);
            MemCache.hset(user._id,this.socket.id);
            this.socket.emit('login',{
                user:user,
                message:"Success"
            })
        })
    }

    /**
     * @param id // other user id
     * @param channel
     * @param token
     * use to accept call
     */

     acceptCall() {
        this.socket.on("acceptCall", async (data) => {
            // const me = this.socket.user.id;
            // data.otherUserId = me;
            console.log(data);
            this.socket.emit('acceptCall',data);
            const recSocket = MemCache.hget(process.env.CHAT_SOCKET, `${data.id}`);
            if (recSocket) {
                this.nsp.to(recSocket).emit("onAcceptCall", data);
            }
        })
    }

    /**
     * @param id // other user id
     * use to reject call
    */
     rejectCall() {
        this.socket.on("rejectCall", async (data) => {
            // const me = this.socket.user.id;
            const recSocket = MemCache.hget(process.env.CHAT_SOCKET, `${data.id}`);
            if (recSocket) {
                const res = { msg: "call disconnected" };
                this.nsp.to(recSocket).emit("onRejectCall", res);
            }
        })
    }

    onCallRequest(){
        this.socket.on("requestCall", async (data) => {
            console.log(data);
            data['patient']['_id'] = data.remoteId;
            this.socket.emit('onCallRequest',data);
        });
    }
    /**
     * @description send Message to another user with socketId
     * @param id // other user id
     * @param message 
     */
    sendMessage() {
        this.socket.on('message',async (data)=>{

        });
    }

    /**
     * 
     */

}

module.exports = SocketEvents;