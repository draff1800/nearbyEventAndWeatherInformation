import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'dummyAPIKey',
  authDomain: 'dummyAuthDomain',
  databaseURL: 'dummyDatabaseURL',
  projectId: 'dummyProjectID',
  storageBucket: 'dummyStorageBucket',
  messagingSenderId: 'dummyMessagingSenderId',
  appId: 'dummyAppId'
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase
