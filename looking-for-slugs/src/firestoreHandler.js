import { auth } from "./firebase"
import { signInWithPopup } from "firebase/auth";
import { doc, addDoc, deleteDoc, collection, getDocs, getDoc, updateDoc, setDoc, writeBatch } from 'firebase/firestore';
import { provider, db } from "./firebase.js";

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
            const usersJoined = getUsersJoinedEvent(doc.id);
            const event = {id:doc.id, joined:usersJoined, ...doc.data()};
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

async function getUsersJoinedEvent(eventId) {
    try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const users = [];
        querySnapshot.forEach(async (doc) => {
            const userData = doc.data();
            if (userData.joinedEvents && userData.joinedEvents.includes(eventId) && userData.username) {
                users.push({
                    id: doc.id,
                    username: userData.username
                });
            }
        });
        return users;
    } catch (e) {
        console.error('Error fetching users:', e);
        return [];
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
                return true;
            } else{
                console.log("User", userId, " is already in ", eventId);
            }
        } else{
            console.log("Event or user does not exist.");
        }
    } catch(e){
        console.error("Error adding user to event: ", e);
    }
    return false;

} 

async function firestoreLeaveEvent(userId, eventId) {
    try {
        const userRef = doc(db, 'users', userId);
        const eventRef = doc(db, 'eventPosts', eventId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedJoinedEvents = userData.joinedEvents.filter(id => id !== eventId);
            await updateDoc(userRef, { joinedEvents: updatedJoinedEvents });
        }
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
            const eventData = eventDoc.data();
            const updatedJoined = eventData.joined.filter(id => id !== userId);
            await updateDoc(eventRef, { joined: updatedJoined });
        }
        console.log("User ", userId,  " has left event ", eventId);
        return true;
    } catch (e) {
        console.error('Error leaving event:', e);
    }
    return false;
}

async function fireStoreDeleteEvent(eventId) {
    try {
        const eventRef = doc(db, 'eventPosts', eventId);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
            await deleteDoc(eventRef);
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            const batch = writeBatch(db);
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                let updatedCreatedEvents = userData.createdEvents || [];
                let updatedJoinedEvents = userData.joinedEvents || [];
                if (updatedCreatedEvents.includes(eventId)) {
                    updatedCreatedEvents = updatedCreatedEvents.filter((id) => id !== eventId);
                    batch.update(doc.ref, { createdEvents: updatedCreatedEvents });
                }
                if (updatedJoinedEvents.includes(eventId)) {
                    updatedJoinedEvents = updatedJoinedEvents.filter((id) => id !== eventId);
                    batch.update(doc.ref, { joinedEvents: updatedJoinedEvents });
                }
            });
            await batch.commit();
            console.log("Event deleted:", eventId);
            return true;
        } else {
            console.log("Event does not exist:", eventId);
        }
    } catch (e) {
        console.error("Error deleting event:", e);
    }
    return false;
}

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
                createdEvents: [],
                username: result.user.displayName
            };
            await setDoc(userRef, userFields);
            console.log("Added ", userId, " to user collection.");
        } else{
            console.log("User ", userId, " already exists in collection.");
        }
        return result.user;
    } catch(e) {
        console.error(e);
    }
    return null;
}

async function editPost(eventTitle, eventTime, eventLocation, eventDescription, eventId){
    // 
    const docRef = doc(db, "eventPosts", eventId);
    await updateDoc(docRef, {
        title: eventTitle,
        time: eventTime,
        location: eventLocation,
        description: eventDescription
    })
}


export {firestoreCreateEvent, firestorePullEvents, fireStoreDeleteEvent, getUsersJoinedEvent, firestoreAddUserToEvent, firestorePullUserInfo, signIn, firestoreLeaveEvent, editPost}
