export default {
    currentView: currentView,
    productSeriesData: productSeriesData,
    productCatalogData: productCatalogData,
    activeProductSeriesId: activeProductSeriesId,
    interestedItems: interestedItems,
    ajaxRequestPending: ajaxRequestPending,
    alreadyRegistered: alreadyRegistered
}

function currentView(state) {
    return state.currentView
}

function productSeriesData(state) {
    return state.productSeriesData
}

function productCatalogData(state) {
    return state.productCatalogData
}

function activeProductSeriesId(state) {
    return state.activeProductSeriesId
}

function interestedItems(state) {
    return state.interestedItems
}

function ajaxRequestPending(state) {
    return state.ajaxRequestPending
}

function alreadyRegistered(state) {
    return state.alreadyRegistered
}
