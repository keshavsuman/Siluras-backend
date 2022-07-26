const {Message,Chat} = require('../models');

/**
 * @description This function is used to create a message
 * @param {Object} message 
 * @returns {Promise<Message>}
 * @author keshav suman
 */
module.exports.createMessage = async (message)=>{
    const message = await Message.create(message);
    return message;
}

/**
 * @description This function is used to get the messages 
 * @param {Number} page 
 * @param {Number} limit 
 * @returns {Promise<Array<Message>>}
 * @author Keshav suman
 */
module.exports.getMessages = async (page,limit)=>{
    const messages = await Message.find({}).limit(limit).skip((page-1)*limit);
    return messages;
}

/**
 * @description This function is used to mark the message as delivered 
 * @param {String} messageId 
 * @returns {Promise<Message>}
 * @author Keshav suman
 */
module.exports.isDeliveredMessage = async (messageId) => {
    const message = await Message.findByIdAndUpdate(messageId,{
        isDelivered:true
    });
    return message;
}

/**
 * @description This function is used to mark the message as read 
 * @param {String} messageId 
 * @returns {Promise<Message>}
 * @author Keshav suman
 */
module.exports.isReadMessage = async (messageId) =>{
    const message = await Message.findByIdAndUpdate(messageId,{
        isSent:true
    });
    return message;
}

/**
 * @description search message Room of a particular user 
 * @author Keshav suman
 * @param {String} searchKeyword
 * @returns {Promise<List<Rooms>>}
 */

module.exports.searchRoom = async (searchKeyword) => {

}


/**
 * @description create chat room 
 * @author Keshav suman
 * @returns {Promise<Chat>}
 */
module.exports.createChat = async () => {
    const chat  = await Chat.create();
    return chat;
}