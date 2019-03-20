const state = {
  nightMode: false
}

const mutations = {
  setNightMode(state, newMode) {
    state.nightMode = newMode
  }
}

const getters = {
  getNightMode(state) {
    return state.nightMode
  }
}

export default {
  state,
  getters,
  mutations
}
