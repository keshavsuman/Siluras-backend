const {MessageModel} = require('../models');

/**
 * @description This function is used to create a message
 * @param {Object} message 
 * @returns {Promise<Message>}
 * @author keshav suman
 */
module.exports.createMessage = async (message)=>{
    const message = await MessageModel.create(message);
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
    const messages = await MessageModel.find({}).limit(limit).skip((page-1)*limit);
    return messages;
}

/**
 * @description This function is used to mark the message as delivered 
 * @param {String} messageId 
 * @returns {Promise<Message>}
 * @author Keshav suman
 */
module.exports.isDeliveredMessage = async (messageId) => {
    const message = await MessageModel.findByIdAndUpdate(messageId,{
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
    const message = await MessageModel.findByIdAndUpdate(messageId,{
        isSent:true
    });
    return message;
}