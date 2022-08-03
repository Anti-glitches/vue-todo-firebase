import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLaV9XNTCk5zHOe4efz6OLK80TeP6rJhQ",
    authDomain: "primeval-beaker-341514.firebaseapp.com",
    projectId: "primeval-beaker-341514",
    storageBucket: "primeval-beaker-341514.appspot.com",
    messagingSenderId: "490614528058",
    appId: "1:490614528058:web:6e714a7736ae826eb63d03",
    measurementId: "G-SVC7MWGE01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
