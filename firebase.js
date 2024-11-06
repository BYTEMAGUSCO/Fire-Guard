// firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMlcBXOJto5WfafJ5LUXaIsYM_FKIkDcA",
  authDomain: "firealarm-d297a.firebaseapp.com",
  projectId: "firealarm-d297a",
  storageBucket: "firealarm-d297a.appspot.com",
  messagingSenderId: "465813160697",
  appId: "1:465813160697:web:5e348bbce6759731c45828",
  measurementId: "G-SJBG80WBW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app); // Add Firestore initialization

// Conditionally initialize Analytics if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Export auth and db for use in your app
export { auth, db, analytics };
