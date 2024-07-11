// Import the functions you need from the SDKs you need
import  {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3G7lEKqTNAbdt0TKAFnIQExpdHZDrMFY",
  authDomain: "recipeapp-eec66.firebaseapp.com",
  projectId: "recipeapp-eec66",
  storageBucket: "recipeapp-eec66.appspot.com",
  messagingSenderId: "614127800815",
  appId: "1:614127800815:web:e426341b7d6beccfb3a61a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export {auth}