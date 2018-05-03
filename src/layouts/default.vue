<template>
  <q-layout view="hHr Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar - v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" label="Menu">
          <q-icon name="person" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :behavior="drawerBehavior" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item to="/">
          <q-item-side icon="fa-home" />
          <q-item-main label="Home" sublabel="Dashboard" />
        </q-item>
        <q-item to="/users">
          <q-item-side icon="person" />
          <q-item-main label="Usuários" sublabel="Cadastro de usuarios" />
        </q-item>
        <!--<q-item @click.native="openURL('https://discord.gg/5TDhbDg')">-->
          <!--<q-item-side icon="chat" />-->
          <!--<q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />-->
        <!--</q-item>-->
      </q-list>
    </q-layout-drawer>

    <q-layout-drawer v-model="rightDrawerOpen" side="right" :behavior="drawerBehavior">
      <q-list no-border link inset-delimiter>
        <q-list-header>
          <div class="header-img">
            <img class="header-img-user" v-if="$root.user && $root.user.photoURL" :src="$root.user.photoURL">
          </div>
        </q-list-header>
        <q-item to="/account">
          <q-item-side icon="person" />
          <q-item-main label="Perfil" sublabel="Perfil" />
        </q-item>
        <q-item @click.native="logout()">
          <q-item-side icon="fa-sign-out-alt" />
          <q-item-main label="Logout" sublabel="Logout" />
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import firebase from 'firebase';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: false,
      drawerBehavior: this.$q.platform.is.desktop ? 'desktop' : 'mobile',
    };
  },
  methods: {
    openURL,
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style lang="stylus">
  .header-img
    text-align center
  .header-img-user
    width 150px
</style>
