import { decode } from 'jsonwebtoken'
import routes from '../../routes'

import { logout, restoreToken } from './adminPanel'

export default {
    // utility functions
    clearStore: clearStore,
    // api resources
    registerRegions: registerRegions,
    registerCountries: registerCountries,
    registerOfficeLocations: registerOfficeLocations,
    registerSeries: registerSeries,
    registerProducts: registerProducts,
    // viewport management
    // registerWindowInnerWidth: (state, windowInnerWidth) => { state.windowInnerWidth = windowInnerWidth },
    // registerWindowInnerHeight: (state, windowInnerHeight) => { state.windowInnerHeight = windowInnerHeight },
    registerClientWidth: (state, clientWidth) => { state.clientWidth = clientWidth },
    registerClientHeight: (state, clientHeight) => { state.clientHeight = clientHeight },
    // header toolbar
    registerHeaderToolbarHeight: (state, height) => { state.headerToolbarHeight = height },
    activateMobileNavMenu: (state) => { state.mobileNavMenu = true },
    deactivateMobileNavMenu: (state) => { state.mobileNavMenu = false },
    toggleMobileNavMenu: (state) => { state.mobileNavMenu = !state.mobileNavMenu },
    // page footer
    registerPageFooterHeight: (state, height) => { state.pageFooterHeight = height },
    // admin panel
    logout: logout,
    restoreToken: restoreToken
}

// utility functions
function clearStore(state) {
    // routing
    state.routes = routes
    // api resources
    // state.clientAccessUrl = // set directly in app.js and is not a dynamic value
    // state.apiUrl = // set directly in app.js and is not a dynamic value
    state.regions = []
    state.countries = []
    state.officeLocations = []
    state.series = []
    state.products = []
    // header toolbar
    state.headerToolbarHeight = null
    state.mobileNavMenu = false
    // page footer
    state.pageFooterHeight = null
    // admin panel
    state.jwt = sessionStorage.jwt || null
    state.email = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.email : null
    state.loginId = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.loginId : null
}

// api resources
function registerRegions(state, data) {
    data.forEach((entry) => {
        state.regions.push(entry.region)
    })
}

function registerCountries(state, data) { state.countries = data }

function registerOfficeLocations(state, data) { state.officeLocations = data }

function registerSeries(state, data) { state.series = data }

function registerProducts(state, data) { state.products = data }
