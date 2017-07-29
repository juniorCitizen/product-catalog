import { turnOnUserDataValidation } from './userData/userDataValidation'

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
    markRegisteredSession: markRegisteredSession,
    updateUserData: updateUserData,
    resetUserData: resetUserData,
    turnOnUserDataValidation: turnOnUserDataValidation
}

function resetStore(state) {
    state.currentView = 'home'
    state.mobileNavMode = false
    state.productSeriesData = []
    state.completeProductData = []
    state.activeProductSeriesId = 1
    state.interestedItems = []
    state.ajaxRequestPending = false
    state.regions = []
    state.countries = []
    state.validatingUserData = false
    // state.resettingUserData = false // pending deprecation
    state.userData = {
        id: null,
        company: '',
        name: '',
        email: '',
        region: 'All Regions',
        country: 'Country',
        comments: ''
    }
    state.alreadyRegistered = false // pending deprecation
    state.registeredUserInfo = { // pending deprecation
        registrationId: null,
        validation: false,
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
    state.countries.splice(0, 0, {
        alpha3Code: null,
        name: 'Country',
        region: 'All Regions',
        createdAt: null,
        updatedAt: null,
        deletedAt: null
    })
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
    state.validatingUserData = false
    // state.resettingUserData = false // pending deprecation
    state.userData = {
        id: payload.registrationId,
        company: payload.company,
        name: payload.name,
        email: payload.email,
        country: payload.country,
        comments: payload.comments
    }
    state.alreadyRegistered = true // pending deprecation
    state.registeredUserInfo = { // pending deprecation
        registrationId: payload.registrationId,
        company: payload.company,
        name: payload.name,
        email: payload.email,
        country: payload.country,
        comments: payload.comments
    }
}

function updateUserData(state, payload) {
    for (let attribute in payload) {
        state.userData[attribute] = payload[attribute]
    }
    // pending deprecation ///////////////////////
    for (let attribute in payload) {
        state.registeredUserInfo[attribute] = payload[attribute]
    }
}

function resetUserData(state) {
    state.validatingUserData = false
    // state.resettingUserData = false // pending deprecation
    state.userData = {
        id: null,
        company: '',
        name: '',
        email: '',
        region: 'All Regions',
        country: 'Country',
        comments: ''
    }
    state.alreadyRegistered = false // pending deprecation
    state.registeredUserInfo = { // pending deprecation
        registrationId: null,
        validation: false,
        company: '',
        name: '',
        email: '',
        country: 'Country',
        comments: ''
    }
}
