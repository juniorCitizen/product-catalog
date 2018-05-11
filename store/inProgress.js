export default {
  namespaced: true,
  state() {
    return {
      inProgress: false,
    }
  },
  mutations: {
    activateInProgressOverlay(state) {
      state.inProgress = true
    },
    deactivateInProgressOverlay(state) {
      state.inProgress = false
    },
  },
}
