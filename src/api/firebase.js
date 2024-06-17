import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAZLsjisGYoVUJxWwm-MN5dLdm-3EW0BD0",
    authDomain: "inkmelo-firebase.firebaseapp.com",
    projectId: "inkmelo-firebase",
    storageBucket: "inkmelo-firebase.appspot.com",
    messagingSenderId: "1046544413274",
    appId: "1:1046544413274:web:16a75e9753447fce981e63"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);