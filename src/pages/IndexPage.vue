<template>

  <div class="q-pa-md q-gutter-sm">
    <q-btn color="primary" icon="add" label="Insertar Candidato" @click="modalCandidato = true"/>
    <q-table
      title="Listado de Candidatos"
      :rows="rows"
      :columns="columns"
      row-key="id"
      rows-per-page-label="Filas por páginas"
      :rows-per-page-options="[10]"
      :filter="filter"
      no-data-label="No hay candidatos para mostrar"
      no-results-label="No hay resultado según la búsqueda"
    >

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat color="warning" icon="edit" @click="editCandidato(props.row)"></q-btn>
          <q-btn flat color="negative" icon="delete" @click="delShowCandidato(props.row)"></q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalCandidato" persistent>
      <q-card class="text-black">
        <q-card-section class="bg-light-blue-1 text-black ">
          <h5 v-show="indice === -1">Detalles Candidato</h5>
          <h5 v-show="indice >= 1">Editar Candidato</h5>
        </q-card-section>
        <q-form
          @submit.prevent="saveCandidato"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-card-section>
            <q-input
              filled
              v-model="name"
              label="Nombre Candidato *"
              required
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Rellene el nombre del candidato']"
            />
            <q-input
              filled
              v-model="lastname"
              label="Apellidos *"
              required
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Rellene los apellidos ']"
            />
            <q-input
              filled
              v-model="ci"
              label="Carnet de Identidad *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Rellene el Carnet de Identidad']"
            />
            <q-input
              filled
              v-model="address"
              label="Dirección *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Rellene la dirección']"
            />
            <q-input
              filled
              v-model="age"
              label="Edad *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Rellene la edad']"
            />
            <q-input
              filled
              v-model="gender"
              label="Género *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Seleccione el género']"
            />

          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              v-if="indice === -1"
              label="Crear"
              type="submit"
              color="primary"
              class="btn btn-sm"
            />
            <q-btn
              v-if="indice >= 1"
              label="Actualizar"
              type="submit"
              color="primary"
            />
            <q-btn label="Cerrar" color="orange" @click="closeModalCandidato"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="delModalCandidato" persistent>
      <q-card>
        <q-card-section>
          Esta seguro que desea eliminar el candidato
          <div style="margin-top: 20px;" class="text-weight-bolder text-red">
            {{ this.name }} {{ this.lastname }}
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn size="14px" padding="xs lg" @click="deleteCandidato(this.id)">Eliminar</q-btn>
          <q-btn size="14px" padding="xs lg" v-close-popup>Cancelar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'

export default {
  setup() {

    const name = ref(null)
    const lastname = ref(null)
    const ci = ref(null)
    const address = ref(null)
    const age = ref(null)
    const gender = ref(null)
    const indice = ref(-1)
    const metodoAxio = ref(null)
    const urlAxio = ref(null)

    const rows = ref([])
    const columns = ref([
      {
        name: 'actions',
        label: 'Acción',
        align: "left"
      },
      {
        name: 'name',
        label: 'Nombre',
        field: row => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'lastname',
        label: 'Apellidos',
        field: row => row.lastname,
        align: 'left'
      },
      {
        name: 'ci',
        label: 'Carnet Identidad',
        field: row => row.ci,
        align: 'center'
      },
      {
        name: 'address',
        label: 'Dirección',
        field: row => row.address,
        align: 'center'
      },
      {
        name: 'age',
        label: 'Edad',
        field: row => row.age,
        align: 'center'
      },
      {
        name: 'gender',
        label: 'Género',
        field: row => row.gender,
        align: 'center'
      },
      // {
      //   name: 'ci',
      //   label: 'Carnet Identidad',
      //   field: row => row.ci,
      //   align: 'center'
      // },
    ])

    return {
      columns,
      rows,
      name,
      lastname,
      ci,
      address,
      age,
      gender,
      modalCandidato: ref(false),
      selected: ref([]),
      filter: ref(''),
      indice,
      metodoAxio,
      urlAxio,
      delModalCandidato: ref(false),

      onReset() {
        name.value = null
        lastname.value = null
        ci.value = null
        address.value = null
        age.value = null
        gender.value = null
        this.indice = -1
      }
    }
  },
  created() {
    this.listCandidato()
  },
  methods: {
    listCandidato() {
      axios({
        method: 'get',
        url: 'http://localhost:8000/v1/api/candidates/'
      })
        .then(response => this.rows = response.data)
        .catch(e => {
          console.log(e)
        })
      this.indice = -1
    },

    saveCandidato() {
      //console.log(this.indice)
      if (this.indice === -1) {
        this.metodoAxio = ref("post")
        this.urlAxio = ref('http://localhost:8000/v1/api/candidates/')
      } else {
        this.metodoAxio = ref('put')
        this.urlAxio = ref('http://localhost:8000/v1/api/candidates/' + this.indice + '/')
      }
      this.indice = -1
      axios({
        method: this.metodoAxio,
        url: this.urlAxio,
        data: {
          name: this.name,
          lastname: this.lastname,
          ci: this.ci,
          address: this.address,
          age: this.age,
          gender: this.gender,
        }
      })
        .then(() => {
          this.listCandidato()
          this.name = ref(null)
          this.lastname = ref(null)
          this.ci = ref(null)
          this.address = ref(null)
          this.age = ref(null)
          this.gender = ref(null)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    closeModalCandidato() {
      this.name = ref(null)
      this.lastname = ref(null)
      this.ci = ref(null)
      this.address = ref(null)
      this.age = ref(null)
      this.gender = ref(null)
      this.modalCandidato = false
      this.indice = -1
    },

    editCandidato(data) {
      const indice = data.id
      axios({
        method: 'put',
        url: `http://localhost:8000/v1/api/candidates/${indice}/`
      })
        .then((response) => {
          this.row = response.data
          this.indice = this.row.id
          this.name = this.row.name
          this.lastname = this.row.lastname
          this.ci = this.row.ci
          this.address = this.row.address
          this.gender = this.row.gender
          this.age = this.row.age
          this.modalCandidato = true
        })
        .catch(e => {
          console.log(e)
        })
    },

    delShowCandidato(data) {
      const id = data.id
      axios({
        method: 'delete',
        url: `http://localhost:8000/v1/api/candidates/${id}/`
      })
        .then(() => {
          this.delModalCandidato = true
          this.name = data.name
          this.lastname = data.lastname
          this.ci = data.ci
          this.age = data.age
          this.address = data.address
          this.gender = data.gender
          this.id = data.id
        })
        .catch(e => {
          console.log(e)
        })
    },

    deleteCandidato(id) {
      axios({
        method: 'delete',
        url: `http://localhost:8000/v1/api/candidates/${id}/`
      })
        .then(() => {
          this.delModalCandidato = false
          this.listCandidato()
        })
        .catch(e => {
          console.log(e)
        })
    }

  },
}
</script>

<style scoped>

</style>
