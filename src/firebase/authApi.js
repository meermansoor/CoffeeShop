import { FIREBASE_SIGNIN, FIREBASE_SIGNUP, jsonPost, FIREBASE_DB_URL } from './firebaseConfig';
import {AsyncStorage} from 'react-native';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
}

export async function signUpWithEmailPassword({ email, password, name, contactNumber, address }) {
  const signup = await jsonPost(FIREBASE_SIGNUP, {
    email,
    password,
    returnSecureToken: true,
  });

  if (FIREBASE_DB_URL && FIREBASE_DB_URL.startsWith('http')) {
    try {
      await fetch(`${FIREBASE_DB_URL}/users/${signup.localId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contactNumber, email, address })
      });
    } catch (_) {}
  }
  return {
    uid: signup.localId,
    idToken: signup.idToken,
    refreshToken: signup.refreshToken,
    email: signup.email,
    name,
    contactNumber,
    address,
  };
}

export async function signInWithEmailPassword({ email, password }) {
  const signin = await jsonPost(FIREBASE_SIGNIN, {
    email,
    password,
    returnSecureToken: true,
  });

  let profile = null;
  if (FIREBASE_DB_URL && FIREBASE_DB_URL.startsWith('http')) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/users/${signin.localId}.json`);
      if (res.ok) {
        profile = await res.json();
      }
    } catch (_) {}
  }

  return {
    uid: signin.localId,
    idToken: signin.idToken,
    refreshToken: signin.refreshToken,
    email: signin.email,
    profile,
  };
}


