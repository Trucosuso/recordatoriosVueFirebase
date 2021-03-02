import firebase from "firebase/app"
import "firebase/firestore"
import { firebaseConfig } from "./firebaseSecret.js";

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

export const storage = firebase.storage();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })