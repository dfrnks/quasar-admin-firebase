<template>
  <q-page class="flex flex-center">
    <div id="loader">
      Loading...
    </div>
    <div id="firebaseui-auth-container"></div>
  </q-page>
</template>

<style lang="stylus">
  #firebaseui-auth-container
    width 100%
    /*margin-top 50px*/
    .firebaseui-info-bar
      left 0
      right 0
</style>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

let ui;

export default {
  name: 'Login',
  mounted() {
    const uiConfig = {
      // signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        uiShown() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        },
      },
      tosUrl: '<your-tos-url>',
    };

    if (ui) {
      ui.reset();
    } else {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>
