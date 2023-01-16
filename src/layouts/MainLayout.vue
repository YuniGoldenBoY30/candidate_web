<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="#42">
        <q-toolbar>
          <q-toolbar-title>Gestión de Candidatos CONTIGUO SURL</q-toolbar-title>
          <q-btn flat dense icon="login" label="Autenticar" @click="persistent = true" />
          <!--<q-btn flat dense icon="man" label="Registrar" />-->
          <q-btn flat dense icon="settings" label="Administrar" t/>
          <!--<q-btn flat @click="drawer = !drawer" round dense icon="menu" />-->
        </q-toolbar>

        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-light-blue-1 text-white" style="width: 300px">
            <q-card-section>
              <div class="text-h6 text-black">Autenticar</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  filled
                  v-model="correo"
                  label="Correo *"
                  hint="Escriba su correo"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Por favor, escriba el correo']"
                />

                <q-input
                  filled
                  type="password"
                  v-model="clave"
                  label="Clave *"
                  lazy-rules
                  :rules="[
                    val => val !== null && val !== '' || 'Por favor, escriba la clave',
                  ]"
                />

                <div>
                  <q-btn label="Autenticar" type="submit" color="primary"/>
                  <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/" active-class="my-menu-link" exact>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple to="/techs" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="apps" />
              </q-item-section>
              <q-item-section>
                Gestionar Tecnologías
              </q-item-section>
            </q-item>


            <q-item clickable v-ripple to="/reportes" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>
              <q-item-section>
                Reportes
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top img resposive" src="~assets/flat.png" style="height: 155px; width: 170px">
          <div class="absolute-bottom bg-transparent">
<!--            <div class="text-weight-bold text-blue-10">Canidate App</div>-->
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const correo = ref(null)
    const clave = ref(null)

    return {
      drawer: ref(false),
      persistent: ref(false),

      correo,
      clave,


      onSubmit () {
        alert('Enviado correo')
      },

      onReset () {
        correo.value = null
        clave.value = null
      }
    }
  }
}
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background: #42A5F5;
}
.my-menu-link-sub {
  color: white;
  background: #30a4de;
}

</style>
