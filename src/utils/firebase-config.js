

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQygra0XVoflrogGUme6sDLefW43eM4tc",
  authDomain: "react-cinestories.firebaseapp.com",
  projectId: "react-cinestories",
  storageBucket: "react-cinestories.appspot.com",
  messagingSenderId: "971189445287",
  appId: "1:971189445287:web:fc3a195ed08877715c3182",
  measurementId: "G-NYZ7HJPQYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth =getAuth(app);