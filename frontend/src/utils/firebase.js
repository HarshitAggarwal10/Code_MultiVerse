// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBy1lOmwKrSbuurYIb1Vo386vOH0P-igNs",
  authDomain: "codemultiverse-5a694.firebaseapp.com",
  projectId: "codemultiverse-5a694",
  storageBucket: "codemultiverse-5a694.firebasestorage.app",
  messagingSenderId: "916022727039",
  appId: "1:916022727039:web:78a32016882c33e6d78a4a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
