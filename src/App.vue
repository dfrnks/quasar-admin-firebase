<template>
    <div id="q-app">
        <router-view/>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'App',
  data() {
    return {
      user: null,
      isCheckAuth: false,
    };
  },
  created() {
    const self = this;

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        self.user = null;
        self.$router.push('/login');
      } else {
        self.user = user;
      }
      self.isCheckAuth = true;
    });
  },
};
</script>

<style>
</style>
