// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAiYzK7dK976x-zdTu__yoiQ_OxxeoATCs',
  authDomain: 'food-explorers.firebaseapp.com',
  projectId: 'food-explorers',
  storageBucket: 'food-explorers.appspot.com',
  messagingSenderId: '973595229276',
  appId: '1:973595229276:web:8c06a12bf8374b121dba99',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
