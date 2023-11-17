import firebase from "firebase/app";
import { getFirestore, doc, addDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { app, db } from "./firebase.js";

function firestoreCreateEvent(eventTitle, eventTime, eventLocation, eventDescription) {
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
            description: eventDescription
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

// Making a way to pull both created events and joined events by a user.
/*async function firestorePullUserInfo(userId){
    try{
        const userRef = doc(db, 'users', userId)
    }
} */

export {firestoreCreateEvent, firestorePullEvents, fireStoreDeleteEvent}