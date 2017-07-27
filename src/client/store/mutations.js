export default {
    resetStore: resetStore,
    registerProductSeriesData: registerProductSeriesData,
    registerProductCatalogData: registerProductCatalogData,
    registerRegionData: registerRegionData,
    registerCountryData: registerCountryData,
    switchView: (state, newView) => { state.currentView = newView },
    switchMobileNavMode: (state, mobileNavMode) => { state.mobileNavMode = mobileNavMode },
    setActiveProductSeries: setActiveProductSeries,
    addItemOfInterest: addItemOfInterest,
    removeItemOfInterest: removeItemOfInterest,
    resetItemsOfInterest: resetItemsOfInterest,
    setAjaxPendingState: (state, pendingState) => { state.ajaxRequestPending = pendingState },
    markRegisteredSession: markRegisteredSession
}

function resetStore(state) {
    state.currentView = 'home'
    state.mobileNavMode = false
    state.productSeriesData = []
    state.completeProductData = []
    state.activeProductSeriesId = 1
    state.interestedItems = []
    state.ajaxRequestPending = false
    state.countries = []
    state.regions = []
    state.alreadyRegistered = false
    state.registeredUserInfo = {
        registrationId: null,
        company: '',
        name: '',
        email: '',
        country: 'Country',
        comments: ''
    }
}

function registerProductSeriesData(state, payload) {
    state.productSeriesData = payload.productSeriesData
}

function registerProductCatalogData(state, payload) {
    state.productCatalogData = payload.productCatalogData
}

function registerRegionData(state, payload) {
    state.regions = ['All Regions']
    payload.regionData.forEach((regionDataEntry) => {
        state.regions.push(regionDataEntry.region)
    })
}

function registerCountryData(state, payload) {
    state.countries = payload.countryData
    state.countries.sort()
}

function setActiveProductSeries(state, productSeriesId) {
    state.activeProductSeriesId = productSeriesId
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

function resetItemsOfInterest(state) {
    state.interestedItems = []
}

function markRegisteredSession(state, payload) {
    state.alreadyRegistered = true
    state.registeredUserInfo = {
        registrationId: payload.registrationId,
        company: payload.company,
        name: payload.name,
        email: payload.email,
        country: payload.country,
        comments: payload.comments
    }
}
