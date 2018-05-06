<template>
  <div>
    <q-page class="flex">
      <q-table
        title="Usuários"
        :data="usuarios"
        :columns="columns"
        selection="multiple"
        :pagination.sync="pagination"
        :selected.sync="selectedSecond"
        row-key="id">
        <!-- gets displayed only when there's at least one row selected -->
        <template slot="top-selection" slot-scope="props">
          <!--<q-btn color="secondary" flat label="Action 1" class="q-mr-sm" />-->
          <!--<q-btn color="secondary" flat label="Action 2" />-->
          <q-btn color="secondary" flat round icon="edit" @click="editRow" />
          <div class="col" />
          <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" />
        </template>
        <template slot="top-left" slot-scope="props">
          <q-btn color="secondary" flat round icon="add" @click="rowInsert = !rowInsert" />
        </template>
      </q-table>
    </q-page>
    <q-modal v-model="rowInsert" content-css="padding: 30px">
      <p>Informe os dados:</p>
      <q-field icon="person" error-label="Nome obrigatório">
        <q-input float-label="Nome" :error="$v.form.nome.$error" v-model="form.nome" />
      </q-field>
      <q-field icon="mail" error-label="Digite um email valido">
        <q-input float-label="E-mail" :error="$v.form.email.$error" v-model="form.email" />
      </q-field>
      <!-- With icon -->
      <br>
      <q-toggle v-model="form.isAdmin" icon="fa-key" label="É administrador?" />
      <br>
      <q-btn color="primary" flat @click="insertRow" label="Salvar" class="btn-insert"/>
    </q-modal>
    <q-modal v-model="rowEdit" content-css="padding: 30px">
      <p>Informe os dados:</p>
      <q-field icon="person" error-label="Nome obrigatório">
        <q-input float-label="Nome" :error="$v.form.nome.$error" v-model="form.nome" />
      </q-field>
      <q-field icon="mail" error-label="Digite um email valido">
        <q-input float-label="E-mail" :error="$v.form.email.$error" v-model="form.email" />
      </q-field>
      <!-- With icon -->
      <br>
      <q-toggle v-model="form.isAdmin" icon="fa-key" label="É administrador?" />
      <br>
      <q-btn color="primary" flat @click="editRowSave" label="Salvar" class="btn-insert"/>
    </q-modal>
  </div>
</template>

<style lang="stylus">
  .q-table-container
    width 100%
   .btn-insert
    float right
</style>

<script>

import firebase from 'firebase';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'PageUsers',
  data() {
    return {
      usuarios: [],
      rowInsert: false,
      rowEdit: false,
      form: {
        nome: '',
        email: '',
        isAdmin: false,
      },
      selectedSecond: [],
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
        {
          name: 'isAdmin',
          required: true,
          label: 'Admin',
          align: 'left',
          field: 'isAdmin',
          sortable: true,
        },
      ],
      pagination: {
        sortBy: 'nome', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10, // current rows per page being displayed
      },
    };
  },
  validations: {
    form: {
      nome: { required },
      email: { required, email },
    },
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
            isAdmin: doc.data().isAdmin,
          });
        });
      });

    db.collection('lojas')
      .onSnapshot((collection) => {
        collection.docs.forEach((doc) => {
          console.log(doc.data());
        });
      });
  },
  methods: {
    insertRow() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify('Verifique as informações digitadas');
        return;
      }

      const db = firebase.firestore();

      db.collection('usuarios').add({
        nome: this.form.nome,
        email: this.form.email,
        isAdmin: this.form.isAdmin,
      })
        .then(() => {
          this.$q.notify({
            message: 'Document successfully written!',
            type: 'positive',
          });

          this.form = {
            nome: '',
            email: '',
            isAdmin: false,
          };
        })
        .catch((error) => {
          this.$q.notify('Error writing document: ', error);
        });

      this.rowInsert = !this.rowInsert;
    },
    editRow() {
      this.form = this.selectedSecond[0];
      this.rowEdit = !this.rowEdit;
    },
    editRowSave() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify('Verifique as informações digitadas');
        return;
      }

      const db = firebase.firestore();

      db.collection('usuarios').doc(this.selectedSecond[0].id)
        .set({
          nome: this.form.nome,
          email: this.form.email,
          isAdmin: this.form.isAdmin,
        })
        .then(() => {
          this.$q.notify({
            message: 'Document successfully written!',
            type: 'positive',
          });

          this.form = {
            nome: '',
            email: '',
            isAdmin: false,
          };
        })
        .catch((error) => {
          this.$q.notify('Error writing document: ', error);
        });

      this.rowEdit = !this.rowEdit;
      this.selectedSecond = [];
    },
    deleteRow() {
      const self = this;
      const db = firebase.firestore();
      const del = self.selectedSecond;

      this.$q.dialog({
        title: 'Excluir',
        message: 'Certeza que deseja excluir esse(s) registro(s)?',
        ok: true,
        cancel: true,
        preventClose: true,
      }).then(() => {
        del.forEach((data) => {
          db.collection('usuarios').doc(data.id).delete();
        });
        self.selectedSecond = [];
      }).catch(() => {
        // this.$q.notify('You didn\'t agree');
        self.selectedSecond = [];
      });
    },
  },
};
</script>
