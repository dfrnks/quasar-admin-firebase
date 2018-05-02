<template>
  <q-page class="flex">
    <div v-if="$root.user">
      <h1>Signup succeeded</h1>
      <!--<button @click='logOut'>Log out</button>-->
      <hr>
      <img v-if="$root.user && $root.user.photoURL" :src="$root.user.photoURL" style="height: 120px"> <br>
      <p>{{$root.user.displayName}}</p>
      <p>{{$root.user.email}}</p>
      <p>{{$root.user.uid}}</p>
      <hr>
      <pre style="overflow-x: auto;">{{$root.user}}</pre>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Success',
};
</script>
