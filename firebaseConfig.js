import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRO9z38UqZh2jFZ4VCIuXMKN2JEszEGd0",
    authDomain: "expoauth-a4e5b.firebaseapp.com",
    projectId: "expoauth-a4e5b",
    storageBucket: "expoauth-a4e5b.appspot.com",
    messagingSenderId: "489245980518",
    appId: "1:489245980518:web:5e3de682662d26ca6bbaa7",
    measurementId: "G-C0Q3XCPMCH"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

//ios
//636314185870-4hg7qbjhsoov3vpd4n3029n1qvpu8lqm.apps.googleusercontent.com

//android
//636314185870-ai2t8aqqfl0a3f4918d0sdbbgol67ldr.apps.googleusercontent.com

export default app

