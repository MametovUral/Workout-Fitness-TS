// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzwNbECg3cRTErHOiHDWY9RxovvOkXdZk",
  authDomain: "gym-training-59f86.firebaseapp.com",
  projectId: "gym-training-59f86",
  storageBucket: "gym-training-59f86.appspot.com",
  messagingSenderId: "672989271390",
  appId: "1:672989271390:web:dbf6118ff05280aed7abcf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
