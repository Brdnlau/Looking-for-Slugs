import firebase from "firebase/app";
import { getFirestore, doc, addDoc, deleteDoc, collection, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { app, db } from "./firebase.js";

function firestoreCreateEvent(eventTitle, eventTime, eventLocation, eventDescription, creatorId) { // Added creatorId field to store eventcreator Id.
    //granger
    try{
        console.log("Firestore: ", db);
    }
    catch(e){
        console.log("couldnt grab database");
    }
    try{
        const docRef = addDoc(collection(db, "eventPosts"), {
            title: eventTitle,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            creator: creatorId, // added later. 
            joined: []  // added later - array of users who have joined, not including the creator.           
        });
        console.log("Document written with title: ", eventTitle);
    }
    catch(e){
        console.error("Error adding Document: ", e);
    }
}




async function firestorePullEvents(){
    // pulling from database (THIS PROBABLY DOESNT WORK DONT CALL IT YET!!!)
    var firestoreEvents = []
    const querySnapshot = await getDocs(collection(db, "eventPosts"))
    .then(querySnapshot =>{
        querySnapshot.forEach((doc) => {
            // console.log(doc.data().title, doc.data().time, doc.data().location, doc.data().description)
            firestoreEvents.push([doc.data().title, doc.data().time, doc.data().location, doc.data().description])
        })
    });
    return firestoreEvents;
}

async function firestoreAddUserToEvent(userId, eventId) {
    try{
        const userRef = doc(db, 'users', userId);
        const eventRef = doc(db, 'eventPosts', eventId);
        const userDoc = await getDoc(userRef);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists() && userDoc.exists()) { 
            const userData = userDoc.data();
            const eventData = eventDoc.data(); 
            if (!eventData.joined.includes(userId)) {
                eventData.joined.push(userId);
                await updateDoc(eventRef, {joined: eventData.joined});
                if(!userData.joinedEvents.includes(eventId)) {
                    userData.joinedEvents.push(eventId);
                    await updateDoc(userRef, {joinedEvents: userData.joinedEvents});
                }
                console.log("User", userId," has been added to event ", eventId);
            } else{
                console.log("User", userId, " is already in ", eventId);
            }
        } else{
            console.log("Event or user does not exist.");
        }
    } catch(e){
        console.error("Error adding user to event:", e);
    }

} 

// Send this function an eventId and it will be deleted from Firebase. 
// After implemented users collections, need to add logic to remove from every users created and joined events!
async function fireStoreDeleteEvent(eventId){
    try {
        const eventRef = doc(db, 'eventPosts', eventId);
        await deleteDoc(eventRef);
        console.log("Document with ID", eventId, "has been deleted.");
    } catch(e) {
        console.error("Error deleting document: ",e);
    }
}


export {firestoreCreateEvent, firestorePullEvents, fireStoreDeleteEvent, firestoreAddUserToEvent}