// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDis1Hf85KpgkrZyp2kE9qqvxIjuoisCOM",
  authDomain: "opgg-dupe.firebaseapp.com",
  databaseURL: "https://opgg-dupe-default-rtdb.firebaseio.com",
  projectId: "opgg-dupe",
  storageBucket: "opgg-dupe.appspot.com",
  messagingSenderId: "182754257640",
  appId: "1:182754257640:web:20b26a20f3ff324f92b75d",
  measurementId: "G-3VJ9NDK9XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // app is the app itself
const analytics = getAnalytics(app);