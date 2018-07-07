// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import createStore from './store/index';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import cors from 'cors';

Vue.use(Vuetify);
Vue.use(cors);

Vue.config.productionTip = false;

const token = localStorage.getItem('access_token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: createStore,
  components: {
    App
  },
  template: '<App/>'
});
