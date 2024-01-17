import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkpwxYTvaPt1Q-vo5whYCrB-aUlahxUwY",
  authDomain: "hungthinh-373da.firebaseapp.com",
  databaseURL: "https://hungthinh-373da-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hungthinh-373da",
  storageBucket: "hungthinh-373da.appspot.com",
  messagingSenderId: "377797070501",
  appId: "1:377797070501:web:15446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
