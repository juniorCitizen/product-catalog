import {
    turnOnUserDataValidation,
    turnOffUserDataValidation
} from './userData/userDataValidation'
import {
    markRegisteredSession,
    updateUserData,
    resetUserData
} from './userData/manipulateUserData'

import { registerAdminProductMenu } from './adminMenu'

export default {
    resetStore: resetStore,
    registerProductSeriesData: registerProductSeriesData,
    registerProductCatalogData: registerProductCatalogData,
    registerRegionData: registerRegionData,
    registerCountryData: registerCountryData,
    switchView: (state, newView) => { state.currentView = newView },
    switchMobileNavMode: (state, mobileNavMode) => { state.mobileNavMode = mobileNavMode },
    switchOffMobileNavMode: (state, mobileNavMode) => { state.mobileNavMode = false },
    switchOnMobileNavMode: (state, mobileNavMode) => { state.mobileNavMode = true },
    setActiveProductSeries: setActiveProductSeries,
    addItemOfInterest: addItemOfInterest,
    removeItemOfInterest: removeItemOfInterest,
    resetItemsOfInterest: resetItemsOfInterest,
    setAjaxPendingState: (state, pendingState) => { state.ajaxRequestPending = pendingState },
    updateUserData: updateUserData,
    resetUserData: resetUserData,
    turnOnUserDataValidation: turnOnUserDataValidation,
    turnOffUserDataValidation: turnOffUserDataValidation,
    // office and contact information
    registerStaffContactInfo: (state, staffContactInfo) => { state.staffData = staffContactInfo },
    registerServiceLocationData: (state, serviceLocationData) => { state.officeLocationData = serviceLocationData },
    switchInViewOfficeId: (state, officeId) => { state.inViewOfficeId = officeId },
    // admin page menu manipulation
    registerAdminProductMenu: registerAdminProductMenu,
    // product data edit mode related
    toggleProductEditMode: toggleProductEditMode,
    // /////////////////////////////////
    // pending deprecation /////////////
    // /////////////////////////////////
    // viewport information
    // registerWindowInnerWidth: (state, windowInnerWidth) => { state.windowsInnerWidth = windowInnerWidth },
    // registerWindowInnerHeight: (state, windowsInnerHeight) => { state.windowsInnerHeight = windowsInnerHeight },
    // registerClientWidth: (state, clientWidth) => { state.clientWidth = clientWidth },
    // registerClientHeight: (state, clientHeight) => { state.clientHeight = clientHeight },
    markRegisteredSession: markRegisteredSession // pending deprecation
}

function toggleProductEditMode(state, payload = null) {
    if (payload === null) {
        state.productEditMode.state = false
        state.productEditMode.productData = null
    } else {
        state.productEditMode.state = false
        state.productEditMode.productData = null
        setTimeout(() => {
            state.productEditMode.state = true
            state.productEditMode.productData = payload
        }, 1)
    }
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
    state.inViewOfficeId = 0
    state.officeLocationData = []
    state.staffData = []
    state.adminMenu = []
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
    state.productEditMode = {
        state: false,
        productData: null
    }
    state.windowInnerWidth = 0
    state.windowInnerHeight = 0
    state.clientWidth = 0
    state.clientHeight = 0
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
