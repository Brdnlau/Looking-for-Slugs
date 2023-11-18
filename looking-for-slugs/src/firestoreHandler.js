import firebase from "firebase/app";
import { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, addDoc, deleteDoc, collection, getDocs, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { app, db } from "./firebase.js";

async function firestoreCreateEvent(eventTitle, eventTime, eventLocation, eventDescription, creatorId) { // Added creatorId field to store eventcreator Id.
    //granger
    try{
        console.log("Firestore: ", db);
    }
    catch(e){
        console.log("couldnt grab database");
    }
    try{
        const docRef = await addDoc(collection(db, "eventPosts"), {
            title: eventTitle,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            creator: creatorId, // added later. 
            joined: []  // added later - array of users who have joined, not including the creator.           
        });
        console.log("Document written with title: ", eventTitle);
        const userRef = doc(db, 'users', creatorId);
        const userDoc = await getDoc(userRef);
        if(userDoc.exists()) {
            const userData = userDoc.data();
            const createdEvents = userData.createdEvents || [];
            createdEvents.push(docRef.id);
            await updateDoc(userRef,{createdEvents});
        } else {
            console.log("Creator doesn't exist.");
        }
    }
    catch(e){
        console.error("Error adding Document: ", e);
    }
}

async function firestorePullEvents() {
    try{
        const eventsCollection = collection(db, 'eventPosts');
        const querySnapshot = await getDocs(eventsCollection);
        const firestoreEvents = [];
        querySnapshot.forEach(doc => {
            const event = {id:doc.id, ...doc.data()};
            firestoreEvents.push(event);
        });
        return firestoreEvents;
    }
    catch (e) {
        console.error("Error fetching events:",e);
        return [];
    }
}


async function firestorePullUserInfo(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data() || {};
            const joinedEvents = userData.joinedEvents || [];
            const createdEvents = userData.createdEvents || [];
            const joinedEventsDetails = await Promise.all(
                joinedEvents.map(async (eventId) => {
                    const eventRef = doc(db, 'eventPosts', eventId);
                    const eventDoc = await getDoc(eventRef);
                    if (eventDoc.exists()) {
                        const eventData = eventDoc.data() || {};
                        return {
                            id: eventId,
                            title: eventData.title,
                            time: eventData.time,
                            location: eventData.location,
                            description: eventData.description,
                            joined: eventData.joined || [],
                        };
                    }
                    return null;
                })
            );
            const createdEventsDetails = await Promise.all(
                createdEvents.map(async (eventId) => {
                    const eventRef = doc(db, 'eventPosts', eventId);
                    const eventDoc = await getDoc(eventRef);
                    if (eventDoc.exists()) {
                        const eventData = eventDoc.data() || {};
                        return {
                            id: eventId,
                            title: eventData.title,
                            time: eventData.time,
                            location: eventData.location,
                            description: eventData.description,
                            joined: eventData.joined || [],
                        };
                    }
                    return null;
                })
            );
            return { joinedEvents: joinedEventsDetails, createdEvents: createdEventsDetails };
        } else {
            console.log('User document does not exist');
            return null;
        }
    } catch (e) {
        console.error('Error fetching user information:', e);
        return null;
    }
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
                console.log("User ", userId," has been added to even ", eventId);
            } else{
                console.log("User", userId, " is already in ", eventId);
            }
        } else{
            console.log("Event or usr does not exist.");
        }
    } catch(e){
        console.error("Error adding user to event: ", e);
    }

} 

// Send this function an eventId and it will be deleted from Firebase. 
// After implemented users collections, need to add logic to remove from every users created and joined events!
async function fireStoreDeleteEvent(eventId){
    try {
        const eventRef = doc(db, 'eventPosts', eventId);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
            await deleteDoc(eventRef);
            console.log("Document with ID", eventId, "has been deleted.");
        } else {
            console.log("Event ", eventId, " does not exist.");
        }
    } catch(e) {
        console.error("Error deleting document: ",e);
    }
}

const provider = new GoogleAuthProvider();

async function signIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user.displayName + " logged in successfully")
        const userId = result.user.uid; 
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            const userFields = {
                joinedEvents: [], 
                createdEvents: []
            };
            await setDoc(userRef, userFields);
            console.log("Added ", userId, " to user collection.");
        } else{
            console.log("User ", userId, " already exists in collection.");
        }
    } catch(e) {
        console.error(e);
    }
}

export {firestoreCreateEvent, firestorePullEvents, fireStoreDeleteEvent, firestoreAddUserToEvent, firestorePullUserInfo, signIn}