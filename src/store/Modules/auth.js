import axios from 'axios'

const state = {
  token: localStorage.getItem('access_token') || '',
  username: localStorage.getItem('username') || '',
  status: ''
}

const getters = {
  isAuthenticated(state) {
    return state.token
  },

  authStatus(state) {
    return state.status
  },

  getUsername(state) {
    return state.username
  }
}

const actions = {
  authRequest({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit('authRequest')
      axios
        .post('http://localhost:5000/api/auth/login', user)
        .then(resp => {
          const token = resp.data.auth_token
          localStorage.setItem('access_token', token)
          localStorage.setItem('username', user.UserName)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit('authSuccess', token)
          dispatch('setDates')
          dispatch('setTotal').then(() => {
            resolve(resp)
          })
        })
        .catch(err => {
          commit('authError', err)
          localStorage.removeItem('access_token')
          reject(err)
        })
    })
  },

  authLogout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('authLogout')
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      resolve()
    })
  }
}

const mutations = {
  authRequest(state) {
    state.status = 'loading'
  },

  authSuccess(state, token) {
    state.status = 'success'
    state.token = token
  },

  authError(state) {
    state.status = 'error'
  },

  authLogout(state) {
    ;(state.token = ''), (state.username = '')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
