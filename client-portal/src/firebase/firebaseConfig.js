// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAo7q26q438GxSbsyCbkMAje5H2JEDZDlM",
  authDomain: "mern-job-portal-1d40e.firebaseapp.com",
  projectId: "mern-job-portal-1d40e",
  storageBucket: "mern-job-portal-1d40e.appspot.com",
  messagingSenderId: "897875117482",
  appId: "1:897875117482:web:51834343c7ef36922ad7d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
