/**
 * @jest-environment jsdom
 */
// importamos la funcion que vamos a testear
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut,
} from 'firebase/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import {
  createWithEmail,
  signInEmail,
  signInGoogle,
  logOut,
  savePost,
  onGetPosts,
} from '../src/lib/JS/index';
import { auth, db } from '../src/lib/JS/firebase.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/lib/JS/firebase.js');

describe('createWithEmail', () => {
  it('debería ser  una función', () => {
    expect(typeof createWithEmail).toBe('function');
  });
  it('Ejecuta createUserWithEmailAndPassword()', async () => {
    const email = 'carol@gmail.com';
    const password = 'carol123';
    await createWithEmail(email, password);
    expect(email).toBe('carol@gmail.com');
    expect(password).toBe('carol123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it('createUserWithEmailAndPassword debería retornar error', () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error('auth/invalid-email'));
    createWithEmail('fulanita.gmail.com', '123456').catch((error) => {
      expect(error.code).toBe('auth/invalid-email');
    });
  });
});

describe('signInEmail', () => {
  it('debería ser una función', () => {
    expect(typeof signInEmail).toBe('function');
  });
  it('Ejecuta sigInWithEmailAndPassword()', () => {
    const email = 'fulanita@gmail.com';
    const password = 'fulanita123';
    signInEmail(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
  it('signInWithEmailAndPassword debería retornar error', () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('auth/invalid-email'));
    signInEmail('fulanita.gmail.com', 'fulanita123').catch((error) => {
      expect(error.code).toBe('auth/invalid-email');
    });
  });
});

describe('signInGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof signInGoogle).toBe('function');
  });
  it('Ejecuta sigInWithPopup()', () => {
    signInGoogle();
    expect(signInWithPopup).toHaveBeenCalled();
  });
  it('signInWithPopup debería retornar error', () => {
    signInWithPopup.mockRejectedValue(new Error('auth/invalid'));
    signInGoogle('fulanita.gmail.com', 'fulanita123').catch((error) => {
      expect(error.code).toBe('auth/invalid');
    });
  });
});

describe('logOut', () => {
  it('debería ser una función', () => {
    expect(typeof logOut).toBe('function');
  });
  it('Ejecuta signOut()', () => {
    signOut(auth);
    expect(signOut).toHaveBeenCalled();
  });
});

describe('savePost', () => {
  test('debería ser una función', () => {
    expect(typeof savePost).toBe('function');
  });
  test('Ejecuta addDoc()', () => {
    addDoc(collection(db, 'text'), {
      content: 'Hola',
      date: '18/12/2022, 19:25:49',
      uid: 'u8C7XOB7gAfnDaGdoJqh0ryTpu23',
      userName: 'Mengana',
    });
    expect(addDoc).toHaveBeenCalled();
  });
});

describe('loadInRealTime', () => {
  it('debería ser una función', () => {
    expect(typeof onGetPosts).toBe('function');
  });
  it('Ejecuta onSnapshot()', () => {
    onSnapshot(collection(db, 'texto'));
    expect(onSnapshot).toHaveBeenCalled();
  });
});
