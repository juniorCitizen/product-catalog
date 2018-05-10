export default {
  namespaced: true,
  state() {
    return {
      inProgress: false,
    }
  },
  mutations: {
    startInProgressAnimation(state) {
      state.inProgress = true
    },
    endInProgressAnimation(state) {
      state.inProgress = false
    },
  },
}
