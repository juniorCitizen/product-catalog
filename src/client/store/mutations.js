export default {
    resetStore: resetStore,
    updateProdSeries: updateProdSeries,
    switchView: switchView
}

function resetStore(state) {
    state.currentView = 'home'
    state.prodSeries = []
}

function updateProdSeries(state, payload) {
    state.prodSeries = payload.prodSeries
}

function switchView(state, newView) {
    state.currentView = newView
}
