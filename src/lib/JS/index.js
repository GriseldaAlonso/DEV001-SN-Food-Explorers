/* eslint-disable consistent-return */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase.js';

// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

// función que crea el usuario con email y password

export const createWithEmail = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // console.log(userCredentials);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
};

// función que permite acceder a la cuenta con email y password

export const signInEmail = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(credentials);
    return credentials;
    // console.log(credentials);
  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode);
    return errorCode;
  }
};

// Iniciar sesión con google

export const signInGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    // console.log(credentials.user);
  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode);
  }
};
