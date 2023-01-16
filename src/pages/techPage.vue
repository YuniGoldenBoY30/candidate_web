<template>

  <div class="q-pa-md q-gutter-sm">

    <q-btn
      label="Nueva"
      icon="add"
      @click="modalTech = true"
    />

    <q-table
      title="Tecnologias"
      :rows="rows"
      :columns="columns"
      row-key="id"
      rows-per-page-label="Filas por páginas"
      :rows-per-page-options="[10]"
      :filter="filter"
      no-data-label="No hay noticias para mostrar"
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
          <q-btn flat color="warning" icon="edit" @click="editTech(props.row)"></q-btn>
          <q-btn flat color="negative" icon="delete" @click="delShowTech(props.row)"></q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalTech" persistent>
      <q-card class="text-black">
        <q-card-section class="bg-light-blue-1 text-black ">
          <h5 v-show="indice === -1">Adicionar Tecnologia</h5>
          <h5 v-show="indice >= 1">Editar Tecnologia</h5>
        </q-card-section>
        <q-form
          @submit.prevent="saveTech"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-card-section>
            <q-input
              filled
              v-model="title"
              label="Titulo Tecnología *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor, ponga el titulo de la tenología']"
            />
            <q-input
              filled
              v-model="content"
              label="Descripcion Tecnologia "
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
            <q-btn label="Cerrar" color="orange" @click="closemodalTech"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="delmodalTech" persistent>
      <q-card>
        <q-card-section>
          Esta seguro que desea eliminar la tecnología
          <div style="margin-top: 20px;" class="text-weight-bolder text-red">
            {{ this.title }}
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn size="14px" padding="xs lg" @click="deleteNoticia(this.id)">Eliminar</q-btn>
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

    const title = ref(null)
    const content = ref(null)
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
        name: 'title',
        label: 'Titulo',
        field: row => row.title,
        sortable: true,
        align: 'left',
      },
      {
        name: 'content',
        label: 'Descripcion',
        field: row => row.content,
        align: 'left'
      }

    ])

    return {
      columns,
      rows,
      title,
      content,
      modalTech: ref(false),
      selected: ref([]),
      filter: ref(''),
      indice,
      metodoAxio,
      urlAxio,
      delmodalTech: ref(false),

      onReset() {
        title.value = null
        content.value = null
        this.indice = -1
      }
    }
  },
  created() {
    this.listTechs()
  },
  methods: {
    listTechs() {
      axios({
        method: 'get',
        url: 'http://localhost:8000/v1/api/techs/'
      })
        .then(response => this.rows = response.data.results)
        .catch(e => {
          console.log(e)
        })
      this.indice = -1
    },

    saveTech() {
      //console.log(this.indice)
      if (this.indice === -1) {
        this.metodoAxio = ref("post")
        this.urlAxio = ref('http://localhost:8000/v1/api/techs/')
      } else {
        this.metodoAxio = ref('put')
        this.urlAxio = ref('http://localhost:8000/v1/api/techs/' + this.indice + '/')
      }
      this.indice = -1
      axios({
        method: this.metodoAxio,
        url: this.urlAxio,
        data: {
          title: this.title,
          content: this.content
        }
      })
        .then(() => {
          this.listTechs()
          this.title = ref(null)
          this.content = ref(null)
          this.modalTech = false
        })
        .catch((error) => {
          console.log(error)
        })
    },

    closemodalTech() {
      this.title = ref(null)
      this.content = ref(null)
      this.modalTech = false
      this.indice = -1
    },

    editTech(data) {
      const indice = data.id
      axios({
        method: 'get',
        url: `http://localhost:8000/v1/api/techs/${indice}`
      })
        .then((response) => {
          this.row = response.data
          this.indice = this.row.id
          this.title = this.row.title
          this.content = this.row.content
          this.modalTech = true
        })
        .catch(e => {
          console.log(e)
        })
    },

    delShowTech(data) {
      const id_noticia = data.id
      axios({
        method: 'get',
        url: `http://localhost:8000/v1/api/techs/${id_noticia}`
      })
        .then(() => {
          this.delmodalTech = true
          this.title = data.title
          this.id = data.id
        })
        .catch(e => {
          console.log(e)
        })
    },

    deleteNoticia(id) {
      console.log(id)
      const id_noticia = id
      axios({
        method: 'delete',
        url: `http://localhost:8000/v1/api/techs/${id_noticia}`
      })
        .then(() => {
          this.delmodalTech = false
          this.listTechs()
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
