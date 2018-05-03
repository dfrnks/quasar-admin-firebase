// import something here
require('firebaseui/dist/firebaseui.css');

import firebase from 'firebase';
import 'firebase/firestore';

// leave the export, even if you don't use it
export default () => {
  // something to do
  const config = {
    apiKey: 'AIzaSyDOQbsbTb0-76YdTv5RPKLA1L1Td4a6kbg',
    authDomain: 'quasar-fbadmin.firebaseapp.com',
    databaseURL: 'https://quasar-fbadmin.firebaseio.com',
    projectId: 'quasar-fbadmin',
    storageBucket: 'quasar-fbadmin.appspot.com',
    messagingSenderId: '189929234958',
  };
  firebase.initializeApp(config);
  const settings = { timestampsInSnapshots: true };
  firebase.firestore().settings(settings);
  firebase.firestore().enablePersistence();
};
