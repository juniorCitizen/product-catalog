export default {
    resetStore: resetStore,
    registerProductSeriesData: registerProductSeriesData,
    registerProductCatalogData: registerProductCatalogData,
    setActiveProductSeries: setActiveProductSeries,
    switchView: (state, newView) => { state.currentView = newView },
    addItemOfInterest: addItemOfInterest,
    removeItemOfInterest: removeItemOfInterest,
    setAjaxPendingState: (state, pendingState) => { state.ajaxRequestPending = pendingState },
    markRegisteredSession: markRegisteredSession,
    registerCountryData: registerCountryData,
    resetItemsOfInterest: resetItemsOfInterest
}

function resetStore(state) {
    state.currentView = 'home'
    state.productSeriesData = []
    state.completeProductData = []
    state.activeProductSeriesId = 1
    state.interestedItems = []
    state.ajaxRequestPending = false
    state.countries = []
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

function registerCountryData(state, payload) {
    state.countries = payload.countryData
    state.countries.sort()
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

function registerProductSeriesData(state, payload) {
    state.productSeriesData = payload.productSeriesData
}

function registerProductCatalogData(state, payload) {
    state.productCatalogData = payload.productCatalogData
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
