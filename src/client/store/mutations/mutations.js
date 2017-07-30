import {
    turnOnUserDataValidation,
    turnOffUserDataValidation
} from './userData/userDataValidation'
import {
    markRegisteredSession,
    updateUserData,
    resetUserData
} from './userData/manipulateUserData'

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
    updateUserData: updateUserData,
    resetUserData: resetUserData,
    turnOnUserDataValidation: turnOnUserDataValidation,
    turnOffUserDataValidation: turnOffUserDataValidation,
    markRegisteredSession: markRegisteredSession // pending deprecation
}

function resetStore(state) {
    state.currentView = 'home'
    state.mobileNavMode = false
    state.productSeriesData = []
    state.completeProductData = []
    state.activeProductSeriesId = 1
    state.interestedItems = []
    state.regions = []
    state.countries = []
    state.validatingUserData = false
    state.ajaxRequestPending = false
    state.userData = {
        id: null,
        company: '',
        name: '',
        email: '',
        region: 'All Regions',
        country: 'Country',
        comments: '',
        botPrevention: ''
    }
    state.regProcStates = {
        prior: true,
        preping: false,
        inProgress: false,
        failure: false,
        complete: false
    }
    // state.resettingUserData = false // pending deprecation
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
