import firebase from 'firebase'

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyATBh9k7racaRziHL7LlnU3smqwslBn2mo",
    authDomain: "sound-redux.firebaseapp.com",
    databaseURL: "https://sound-redux.firebaseio.com",
    projectId: "sound-redux",
    storageBucket: "sound-redux.appspot.com",
    messagingSenderId: "501523739170"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

