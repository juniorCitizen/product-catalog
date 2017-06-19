import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default {
    resetStore: resetStore,
    switchView: switchView
}

function resetStore(state) {
    // this.$router.push('home')
    state.currentView = 'home'
}

function switchView(state, newView) {
    // Vue.$router.push(newView)
    state.currentView = newView
}
