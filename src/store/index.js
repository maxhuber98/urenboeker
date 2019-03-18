import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import auth from './modules/auth'
import times from './Modules/times'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const createStore = new Vuex.Store({
  modules: {
    layout,
    auth,
    times
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})

export default createStore
