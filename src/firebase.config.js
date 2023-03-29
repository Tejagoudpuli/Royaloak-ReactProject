import { getApp,getApps,initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBMyU0FblxNI6-iTqBhDVhkmM1LOmFaNfk",
    authDomain: "woodenstoreapp.firebaseapp.com",
    databaseURL: "https://woodenstoreapp-default-rtdb.firebaseio.com",
    projectId: "woodenstoreapp",
    storageBucket: "woodenstoreapp.appspot.com",
    messagingSenderId: "678846985422",
    appId: "1:678846985422:web:f9de3a414aa6fc70118c9f"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export { app, firestore, storage };