/**
 * @jest-environment jsdom
 */
// importamos la funcion que vamos a testear
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut,
} from 'firebase/auth';
import {
  createWithEmail, signInEmail, signInGoogle, logOut,
} from '../src/lib/JS/index';
import { auth } from '../src/lib/JS/firebase.js';

jest.mock('firebase/auth');
jest.mock('../src/lib/JS/firebase.js');

describe('createWithEmail', () => {
  it('debería ser  una función', () => {
    expect(typeof createWithEmail).toBe('function');
  });
  it('Ejecuta createUserWithEmailAndPassword()', () => {
    const email = 'carol@gmail.com';
    const password = 'carol123';

    createWithEmail(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
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
});

describe('signInGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof signInGoogle).toBe('function');
  });
  it('Ejecuta sigInWithPopup()', () => {
    signInGoogle();
    expect(signInWithPopup).toHaveBeenCalled();
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
