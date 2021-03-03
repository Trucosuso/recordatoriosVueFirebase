import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { firebaseConfig } from "./firebaseSecret.js";

// Get a Firestore instance
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()

// Firebase authentication
export default {
    auth: firebase.auth(),
    login(choosenProvider) {
        let provider = null;

        if (choosenProvider == "google") {
            provider = new firebase.auth.GoogleAuthProvider();
        } else {
            provider = new firebase.auth.GithubAuthProvider();
        }

        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                console.log(result);
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.warn(errorCode, errorMessage, email, credential);
            });
    },
    logout() {
        firebase.auth().signOut()
            .then(function () {
                console.log("Logged out");
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })