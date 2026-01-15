import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnyOuAa-CBnchb7CfX9IyQ5tW5mnuklCE",
  authDomain: "resturant-pro.firebaseapp.com",
  projectId: "resturant-pro",
  storageBucket: "resturant-pro.firebasestorage.app",
  messagingSenderId: "831674157694",
  appId: "1:831674157694:web:08818e1e763509cb1e262f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
