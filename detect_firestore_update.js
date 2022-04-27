const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.onUserCreate = functions.firestore.document('users/{userId}').onCreate(async (snap, context)=> {
    const values = snap.data();
    await db.collection('logging').add({description: `Email was sent to user with username: ${values.username}`});
})

exports.onUserUpdate = functions.firestore.document('users/{userId}').onUpdate(async (snap, context)=> {
    const newValues = snap.after.data();
    const previousValues = snap.before.data();

    if(newValues.mail_address !== previousValues.mail_address){
        await db.collection('update').add({description: `Email was sent to user with mail_address: ${newValues.mail_address}`});
        const mail_address = await newValues.mail_address;
        // functions.logger.log("newValues.mail_address: ", mail_address);
    }
})
