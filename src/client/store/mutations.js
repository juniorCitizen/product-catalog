export default {
    resetStore: resetStore,
    updateProdSeries: updateProdSeries,
    switchView: switchView,
    addItemOfInterest: addItemOfInterest,
    removeItemOfInterest: removeItemOfInterest
}

function resetStore(state) {
    state.currentView = 'home'
    state.prodSeries = []
    state.interestedItems = []
}

function updateProdSeries(state, payload) {
    state.prodSeries = payload.prodSeries
}

function switchView(state, newView) {
    state.currentView = newView
}

function addItemOfInterest(state, productId) {
    if (state.interestedItems.indexOf(productId) === -1) {
        state.interestedItems.push(productId)
    }
}

function removeItemOfInterest(state, productId) {
    if (state.interestedItems.indexOf(productId) !== -1) {
        state.interestedItems.splice(state.interestedItems.indexOf(productId), 1)
    }
}
