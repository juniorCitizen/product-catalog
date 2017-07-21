export default {
    currentView: currentView,
    productSeriesData: productSeriesData,
    productCatalogData: productCatalogData,
    activeProductSeriesId: activeProductSeriesId,
    interestedItems: interestedItems
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
