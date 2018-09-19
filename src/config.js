import firebase from 'firebase'

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyAGoLCar8hrofLN3wIUI41XFgOVODz_wSM",
    authDomain: "my-exp-2e5af.firebaseapp.com",
    databaseURL: "https://my-exp-2e5af.firebaseio.com",
    projectId: "my-exp-2e5af",
    storageBucket: "my-exp-2e5af.appspot.com",
    messagingSenderId: "201538918294"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

