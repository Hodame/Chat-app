
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIwZcsN-RBqZoMP5jqV3n7xSd2BLuclVk",
  authDomain: "messengerx-b826a.firebaseapp.com",
  projectId: "messengerx-b826a",
  storageBucket: "messengerx-b826a.appspot.com",
  messagingSenderId: "765881883735",
  appId: "1:765881883735:web:e124047797bfefbd911712",
  measurementId: "G-3R2HL5S16F",
  databaseURL: "https://messengerx-b826a-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {
  analytics,
  db,
  auth
}