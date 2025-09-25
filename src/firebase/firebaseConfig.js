// Provide your Firebase Web API key here. Consider moving to env/secure storage in production.
export const FIREBASE_API_KEY = 'AIzaSyDj6tVNENlXirPube1HQT25ql36vMPLYJ0';

// Firebase Identity Toolkit endpoints
export const FIREBASE_AUTH_BASE = 'https://identitytoolkit.googleapis.com/v1';
export const FIREBASE_SIGNUP = `${FIREBASE_AUTH_BASE}/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const FIREBASE_SIGNIN = `${FIREBASE_AUTH_BASE}/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
export const FIREBASE_ACCOUNT_INFO = `${FIREBASE_AUTH_BASE}/accounts:lookup?key=${FIREBASE_API_KEY}`;

export async function jsonPost(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.message || 'Request failed';
    throw new Error(message);
  }
  return data;
}

// Realtime Database URL (without trailing slash), e.g. https://your-project-id-default-rtdb.firebaseio.com
export const FIREBASE_DB_URL = 'https://coffeeshop-40de7-default-rtdb.firebaseio.com'; 


