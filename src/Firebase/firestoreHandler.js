import { auth } from "./firebase.js";
import { signInWithPopup } from "firebase/auth";
import {
  doc,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { provider, db } from "./firebase.js";

async function firestoreCreateEvent({
  eventTitle,
  eventTime,
  eventDate,
  eventLocation,
  eventDescription,
  eventCapacity,
  creatorId,
  creatorName,
}) {
  // Added creatorId field to store eventcreator Id.
  //granger
  try {
    console.log("Firestore: ", db);
  } catch (e) {
    console.log("couldnt grab database");
  }
  try {
    const docRef = await addDoc(collection(db, "eventPosts"), {
      title: eventTitle,
      time: eventTime,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
      capacity: eventCapacity,
      creatorID: creatorId, // added later.
      creatorName: creatorName,
      joined: [], // added later - array of users who have joined, not including the creator.
    });

    console.log("Document written with title: ", eventTitle);
    const userRef = doc(db, "users", creatorId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const createdEvents = userData.createdEvents || [];
      createdEvents.push(docRef.id);
      await updateDoc(userRef, { createdEvents });
    } else {
      console.log("Creator doesn't exist.");
    }
  } catch (e) {
    console.error("Error adding Document: ", e);
  }
}

async function firestorePullEvents() {
  try {
    const eventsCollection = collection(db, "eventPosts");
    const querySnapshot = await getDocs(eventsCollection);
    const firestoreEvents = [];
    const newDate = new Date();
    const todayDate = newDate.getDate();
    const todayMonth = newDate.getMonth() + 1; // January is 0, not 1
    const todayYear = newDate.getFullYear();
    // console.log("Today's date: Month: ", todayMonth, " Date: ", todayDate, " Year: ", todayYear);

    for (const doc of querySnapshot.docs) {
      const usersJoined = await getUsersJoinedEvent(doc.id);
      const usernames = usersJoined.map((user) => user.userDatasername);
      const event = { id: doc.id, ...doc.data(), joined: usernames };
      const eventDate = event.date.split("-"); // [year, month, day]
      //console.log("Event ", event.id, "'s date: ", eventDate);
      if (
        todayYear > eventDate[0] ||
        (todayYear >= eventDate[0] &&
          ((todayMonth == eventDate[1] && todayDate > eventDate[2]) ||
            todayMonth > eventDate[1]))
      ) {
        console.log("Event ", event.id, " has expired. Thus, deleted");
        fireStoreDeleteEvent(event.id);
      } else {
        firestoreEvents.push(event);
      }
    }
    return firestoreEvents;
  } catch (e) {
    console.error("Error fetching events:", e);
    return [];
  }
}

async function firestorePullUserInfo(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data() || {};
      console.log(userDoc.data());
      const joinedEvents = userData.joinedEvents || [];
      const createdEvents = userData.createdEvents || [];
      const joinedEventsDetails = await Promise.all(
        joinedEvents.map(async (eventId) => {
          const eventRef = doc(db, "eventPosts", eventId);
          const eventDoc = await getDoc(eventRef);
          if (eventDoc.exists()) {
            const eventData = eventDoc.data() || {};
            const usersJoined = await getUsersJoinedEvent(eventId);
            const usernames = usersJoined.map((user) => user.userDatasername);
            return {
              id: eventId,
              title: eventData.title,
              time: eventData.time,
              date: eventData.date,
              location: eventData.location,
              description: eventData.description,
              capacity: eventData.capacity,
              joined: usernames || [],
              creatorID: eventData.creatorID,
              creatorName: eventData.creatorName,
            };
          }
          return null;
        })
      );
      const createdEventsDetails = await Promise.all(
        createdEvents.map(async (eventId) => {
          const eventRef = doc(db, "eventPosts", eventId);
          const eventDoc = await getDoc(eventRef);
          if (eventDoc.exists()) {
            const eventData = eventDoc.data() || {};
            const usersJoined = await getUsersJoinedEvent(eventId);
            const usernames = usersJoined.map((user) => user.userDatasername);
            return {
              id: eventId,
              title: eventData.title,
              time: eventData.time,
              date: eventData.date,
              location: eventData.location,
              description: eventData.description,
              capacity: eventData.capacity,
              joined: usernames || [],
              creatorID: eventData.creatorID,
              creatorName: eventData.creatorName,
            };
          }
          return null;
        })
      );
      return {
        joinedEvents: joinedEventsDetails,
        createdEvents: createdEventsDetails,
      };
    } else {
      console.log("User document does not exist");
      return null;
    }
  } catch (e) {
    console.error("Error fetching user information:", e);
    return null;
  }
}

async function getUsersJoinedEvent(eventId) {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (
        userData.joinedEvents &&
        userData.joinedEvents.includes(eventId) &&
        userData.username
      ) {
        users.push({
          id: doc.id,
          userDatasername: userData.username,
        });
      }
    });
    return users;
  } catch (e) {
    console.error("Error fetching users:", e);
    return [];
  }
}

async function firestoreAddUserToEvent(userId, eventId) {
  try {
    const userRef = doc(db, "users", userId);
    const eventRef = doc(db, "eventPosts", eventId);
    const userDoc = await getDoc(userRef);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists() && userDoc.exists()) {
      const userData = userDoc.data();
      const eventData = eventDoc.data();
      const numJoined = eventData.joined.length;
      console.log("Event capacity: ", eventData.capacity);
      console.log("Users joined: ", numJoined);
      if (!eventData.joined.includes(userId)) {
        console.log(numJoined >= eventData.capacity);
        if (numJoined >= eventData.capacity) {
          console.log("Event ", eventId, " is full :(");
          return false;
        }
        eventData.joined.push(userId);
        await updateDoc(eventRef, { joined: eventData.joined });
        if (!userData.joinedEvents.includes(eventId)) {
          userData.joinedEvents.push(eventId);
          await updateDoc(userRef, { joinedEvents: userData.joinedEvents });
        }
        console.log("User ", userId, " has been added to event ", eventId);
        return true;
      } else {
        console.log("User", userId, " is already in ", eventId);
      }
    } else {
      console.log("Event or user does not exist.");
    }
  } catch (e) {
    console.error("Error adding user to event: ", e);
  }
  return false;
}

async function firestoreLeaveEvent(userId, eventId) {
  try {
    const userRef = doc(db, "users", userId);
    const eventRef = doc(db, "eventPosts", eventId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedJoinedEvents = userData.joinedEvents.filter(
        (id) => id !== eventId
      );
      await updateDoc(userRef, { joinedEvents: updatedJoinedEvents });
    }
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const updatedJoined = eventData.joined.filter((id) => id !== userId);
      await updateDoc(eventRef, { joined: updatedJoined });
    }
    console.log("User ", userId, " has left event ", eventId);
    return true;
  } catch (e) {
    console.error("Error leaving event:", e);
  }
  return false;
}

async function fireStoreDeleteEvent(eventId) {
  try {
    const eventRef = doc(db, "eventPosts", eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      await deleteDoc(eventRef);
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const batch = writeBatch(db);
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        let updatedCreatedEvents = userData.createdEvents || [];
        let updatedJoinedEvents = userData.joinedEvents || [];
        if (updatedCreatedEvents.includes(eventId)) {
          updatedCreatedEvents = updatedCreatedEvents.filter(
            (id) => id !== eventId
          );
          batch.update(doc.ref, { createdEvents: updatedCreatedEvents });
        }
        if (updatedJoinedEvents.includes(eventId)) {
          updatedJoinedEvents = updatedJoinedEvents.filter(
            (id) => id !== eventId
          );
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
    console.log(result.user.displayName + " logged in successfully");
    const userId = result.user.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      const userFields = {
        joinedEvents: [],
        createdEvents: [],
        username: result.user.displayName,
      };
      await setDoc(userRef, userFields);
      console.log("Added ", userId, " to user collection.");
    } else {
      console.log("User ", userId, " already exists in collection.");
    }
    return result.user;
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function editPost({
  eventTitle,
  eventTime,
  eventDate,
  eventLocation,
  eventDescription,
  eventCapacity,
  eventId,
}) {
  const docRef = doc(db, "eventPosts", eventId);
  await updateDoc(docRef, {
    title: eventTitle,
    time: eventTime,
    date: eventDate,
    location: eventLocation,
    description: eventDescription,
    capacity: eventCapacity,
  });
}

export {
  firestoreCreateEvent,
  firestorePullEvents,
  fireStoreDeleteEvent,
  getUsersJoinedEvent,
  firestoreAddUserToEvent,
  firestorePullUserInfo,
  signIn,
  firestoreLeaveEvent,
  editPost,
};
