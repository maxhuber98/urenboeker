import axios from 'axios'
import moment from 'moment'

const state = {
  overview: [],
  status: 'loading',
  dates: {
    min: null,
    max: null
  },
  error: null,
  total: {
    minutes: 0,
    hours: 0
  }
}

const getters = {
  getOverview(state) {
    return state.overview
  },

  getDates(state) {
    return state.dates
  },

  getTotal(state) {
    return state.total
  }
}

const actions = {
  setOverview({
    commit,
    dispatch
  }, month) {
    return new Promise((resolve, reject) => {
      commit('setOverview')
      resolve()
    })
  },
  setDates({
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.ROOT_API + '/times/GetMinMax')
        .then(resp => {
          const data = resp.data
          commit('setDates', data)
          resolve()
        })
        .catch(error => {
          commit('setError', error)
          reject()
        })
    })
  },
  setTotal({
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      const date = moment().format('YYYY/MM/DD')
      axios
        .get(process.env.ROOT_API + '/times/GetTotal?date=' + date)
        .then(resp => {
          const total = resp.data
          const obj = {
            hours: total.split(':')[0],
            minutes: total.split(':')[1]
          }
          commit('setTotal', obj)
          resolve(obj)
        })
    })
  }
}

const mutations = {
  setOverview(state) {
    state.overview = 'loaded'
  },

  setDates(state, dates) {
    state.dates = dates
  },

  setError(state, err) {
    state.error = err
  },

  setTotal(state, total) {
    state.total = total
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
