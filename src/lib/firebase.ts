// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqEWbA6C8qFY74a4LJ48fxxJiyOVh0NzA",
  authDomain: "greendevs-376c1.firebaseapp.com",
  projectId: "greendevs-376c1",
  storageBucket: "greendevs-376c1.firebasestorage.app",
  messagingSenderId: "533385333497",
  appId: "1:533385333497:web:3ea7fcac24a5335299b028",
  measurementId: "G-EFMBS8HD6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;