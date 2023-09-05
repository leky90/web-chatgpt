// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Auth, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let firebaseApp = null;
let analytics = null;
let firebaseAuth: Auth = null;

if (typeof window !== 'undefined') {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyBc_lrk2IVvtahY0uIcEcpie-uBY_XUy8w',
    authDomain: 'ai-chat-67c57.firebaseapp.com',
    projectId: 'ai-chat-67c57',
    // storageBucket: "ai-chat-67c57.appspot.com",
    messagingSenderId: '101746331564',
    appId: '1:101746331564:web:08bbcfb53f8826f6617409',
    measurementId: 'G-VD59W4SQ2J',
  };

  // Initialize Firebase
  firebaseApp = initializeApp(firebaseConfig);
  analytics = getAnalytics(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
}

// Initialize Firebase
export { firebaseApp, analytics, firebaseAuth };
