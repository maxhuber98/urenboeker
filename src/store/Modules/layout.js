const namespaced = true;

const state = {
  layout: 'simple-layout'
}

const mutations = {
  SET_LAYOUT(state, payload) {
    state.layout = payload
  }
}

const getters = {
  layout(state) {
    return state.layout
  }
}

export default {
  // namespaced: true,
  mutations,
  getters,
  state
}
