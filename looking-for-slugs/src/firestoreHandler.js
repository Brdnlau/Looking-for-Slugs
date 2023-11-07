import firebase from "firebase/app";
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
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

function firestorePullEvents(){
    // pulling from database (THIS PROBABLY DOESNT WORK DONT CALL IT YET!!!)
    var firestoreEvents = []
    const querySnapshot = getDocs(collection(db, "eventPosts"))
    .then(querySnapshot =>{
        querySnapshot.forEach((doc) => {
            // console.log(doc.data().title, doc.data().time, doc.data().location, doc.data().description)
            firestoreEvents.push([doc.data().title, doc.data().time, doc.data().location, doc.data().description])
        })
    });
    return firestoreEvents;
}

export {firestoreCreateEvent, firestorePullEvents}