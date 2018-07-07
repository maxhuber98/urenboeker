import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import auth from './modules/auth'
import times from './Modules/times'
Vue.use(Vuex)

const createStore = new Vuex.Store({
  modules: {
    layout,
    auth,
    times
  }
})

export default createStore
