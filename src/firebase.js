import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDhk30OaQLi8XKUv8ko6JrHflU7yXF2qg",
    authDomain: "react-chat-app-12.firebaseapp.com",
    projectId: "react-chat-app-12",
    storageBucket: "react-chat-app-12.appspot.com",
    messagingSenderId: "366580767674",
    appId: "1:366580767674:web:e6f62386f17f3a3c501b83",
    measurementId: "G-9TFF0HVFG3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };