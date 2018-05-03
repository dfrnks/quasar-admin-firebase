<template>
  <q-page class="flex">
    <q-table title="Usuários" :data="usuarios" :columns="columns" row-key="id"/>
  </q-page>
</template>

<style lang="stylus">
  .q-table-container
    width 100%
</style>

<script>

import firebase from 'firebase';

export default {
  name: 'PageUsers',
  data() {
    return {
      usuarios: [],
      columns: [
        {
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'nome',
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          label: 'E-mail',
          align: 'left',
          field: 'email',
          sortable: true,
        },
      ],
    };
  },
  created() {
    const self = this;

    const db = firebase.firestore();

    db.collection('usuarios')
      .onSnapshot((collection) => {
        self.usuarios = [];
        collection.docs.forEach((doc) => {
          self.usuarios.push({
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
          });
        });
      });
  },
};
</script>
