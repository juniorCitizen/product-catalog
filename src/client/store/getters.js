export default {
    currentView: (state) => { return state.currentView },
    productSeriesData: (state) => { return state.productSeriesData },
    productCatalogData: (state) => { return state.productCatalogData },
    activeProductSeriesId: (state) => { return state.activeProductSeriesId },
    interestedItems: (state) => { return state.interestedItems },
    ajaxRequestPending: (state) => { return state.ajaxRequestPending },
    alreadyRegistered: (state) => { return state.alreadyRegistered },
    countries: (state) => { return state.countries },
    regions: (state) => { return state.regions }
}
