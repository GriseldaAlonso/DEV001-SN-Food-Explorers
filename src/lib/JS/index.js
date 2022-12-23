/* eslint-disable consistent-return */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc, collection, onSnapshot, orderBy, query,
} from 'firebase/firestore';
import { auth, provider, db } from './firebase.js';

// función que crea el usuario con email y password
export const createWithEmail = async (email, password, nameUser) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    if (nameUser !== '') {
      try {
        await updateProfile(auth.currentUser, {
          displayName: nameUser,
        });
      } catch (error) {
        // An error occurred
        // ...
      }
    }
    return credentials;
  } catch (error) {
    const errorCode = error.code;
    return errorCode;
  }
};

// función que permite acceder a la cuenta con email y password
export const signInEmail = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials;
  } catch (error) {
    const errorCode = error.code;
    return errorCode;
  }
};

// Iniciar sesión con google
export const signInGoogle = async () => {
  try {
    const credentials = await signInWithPopup(auth, provider);
    return credentials;
  } catch (error) {
    const errorCode = error.code;
    return errorCode;
  }
};

// función para cerrar sesióngh
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorMessage = error.message;
    return errorMessage;
  }
};

// función para guardar publicaciones
export const savePost = async (text, currentDate, userId, userNameValue, ts) => {
  try {
    await addDoc(collection(db, 'posts'), {
      content: text,
      date: currentDate,
      uid: userId,
      userName: userNameValue,
      timeStamp: ts,
    });
  } catch (error) {
    const errorCode = error.code;
    return errorCode;
  }
};

// función para cargar los posts en tiempo real
export const onGetPosts = (querySnapshot) => {
  const queryPosts = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(queryPosts, querySnapshot);
};
