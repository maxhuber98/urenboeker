<template>
  <v-app>
    <div>
      <component :is="layout.layout"></component>
    </div>
  </v-app>
</template>

<script>
import AppLayout from './Layouts/AppLayout'
import SimpleLayout from './Layouts/Simple'
import { mapState, mapMutations, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  computed: {
    ...mapState(['layout'])
  },
  components: {
    'app-layout': AppLayout,
    'simple-layout': SimpleLayout
  },
  created() {
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('authLogout')
        }
        throw err
      })
    })
  }
}
</script>
