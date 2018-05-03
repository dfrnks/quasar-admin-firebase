<template>
  <q-page class="content flex">
    <div v-if="$root.user">
      <hr>
      <div class="row">
        <div>
          <img v-if="$root.user && $root.user.photoURL" :src="$root.user.photoURL" >
        </div>
        <div>
          <p>{{$root.user.displayName}}</p>
          <p>{{$root.user.email}}</p>
          <p>{{$root.user.uid}}</p>
        </div>
      </div>

      <hr>
      <pre style="overflow-x: auto;">{{$root.user}}</pre>
    </div>
  </q-page>
</template>

<style lang="stylus">
  .content
    margin 10px
  img
    width 160px
</style>

<script>
export default {
  name: 'Success',
};
</script>
