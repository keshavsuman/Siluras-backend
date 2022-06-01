const {Notification} = require('../../models');

function createNotification({title,body,type,userId}){
    const notification = await Notification.create({
        title,
        body,
        type,
        userId
    });
    return notification;
}

function updateNotification(id,body){
    const notification = Notification.findByIdAndUpdate(id,body,{new:true});
    if(notification){
        const notification_new = await Notification.findByIdAndUpdate(id,body,{new:true});
        return notification_new;
    }else{
        throw new Error('Notification not found');
    }
}

function deleteNotificationById(id){
    const notification = Notification.findById(id);
    if(notification){
        return notification;
    }else{
        throw new Error('Notification not found');
    }
}

function getNotifications(){
    const notifications = await Notification.find({});
    return notifications; 
}

module.exports = {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotificationById,
}