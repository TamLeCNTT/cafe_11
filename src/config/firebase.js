import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhe9BP4WoThrwU_5uG5f0iiArAJuM0-Rc",
  authDomain: "crud-hungthinh.firebaseapp.com",
  databaseURL:
    "https://crud-hungthinh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-hungthinh",
  storageBucket: "crud-hungthinh.appspot.com",
  messagingSenderId: "688414898512",
  appId: "1:688414898512:web:fa06adfa5992b2c45d1455",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
