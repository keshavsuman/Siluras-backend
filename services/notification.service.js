const {Notification} = require('../models');

/**
 * @description: get notification by id
 * @param {String} title 
 * @param {String} body 
 * @param {String} type 
 * @param {String} userId 
 * @returns {Promise<Notification>}
 * @author keshav suman
 */
async function createNotification({title,body,type,userId}){
    const notification = await Notification.create({
        title,
        body,
        type,
        userId
    });
    return notification;
}

/**
 * @description: update notification by id
 * @param {String} id 
 * @param {String} body 
 * @returns {Promise<Notification>}
 * @author keshav suman
 */
async function updateNotification(id,body){
    const notification = Notification.findByIdAndUpdate(id,body,{new:true});
    if(notification){
        const notification_new = await Notification.findByIdAndUpdate(id,body,{new:true});
        return notification_new;
    }else{
        throw new Error('Notification not found');
    }
}

/**
 * @description delete a notification By Id
 * @param {String} id 
 * @returns {Promise<Notification>}
 * @throws {Error} if notification not found by the given Id
 * @author keshav suman
 */
async function deleteNotificationById(id){
    const notification = Notification.findById(id);
    if(notification){
        return notification;
    }else{
        throw new Error('Notification not found');
    }
}

/**
 * @description get the notification by id
 * @param {String} page
 * @param {String} limit
 * @returns {Promise<Notification>}
 * @author keshav suman
 */
async function getNotifications(page,limit){
    const notifications = await Notification.find({}).skip((page-1)*limit).limit(limit);
    return notifications; 
}

module.exports = {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotificationById,
}