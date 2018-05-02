<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar - v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu</q-list-header>
        <q-item to="/">
          <q-item-side icon="school" />
          <q-item-main label="Home" sublabel="Dashboard" />
        </q-item>
        <q-item to="/users">
          <q-item-side icon="person" />
          <q-item-main label="Usuários" sublabel="Cadastro de usuarios" />
        </q-item>
        <q-item to="/success">
          <q-item-side icon="person" />
          <q-item-main label="Perfil" sublabel="Perfil" />
        </q-item>
        <!--<q-item @click.native="openURL('https://discord.gg/5TDhbDg')">-->
          <!--<q-item-side icon="chat" />-->
          <!--<q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />-->
        <!--</q-item>-->
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
  },
};
</script>

<style>
</style>
