import { decode } from 'jsonwebtoken'
import routes from '../../routes'

import adminPanel from './adminPanel'
import loginForm from './loginForm'

export default {
    // utility functions
    clearStore: clearStore,
    // api resources
    registerRegions: registerRegions,
    registerCountries: registerCountries,
    registerOfficeLocations: registerOfficeLocations,
    registerSeries: registerSeries,
    registerProducts: registerProducts,
    toggleDataSubmissionState: (state, functionReference) => {
        state.dataSubmission.function = functionReference
        state.dataSubmission.inProgress = true
    },
    resetDataSubmissionState: (state) => {
        state.dataSubmission.function = null
        state.dataSubmission.inProgress = false
    },
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
    // login form
    registerLoginFormEmail: (state, email) => { state.loginForm.email = email },
    registerLoginFormLoginId: (state, loginId) => { state.loginForm.loginId = loginId },
    registerLoginFormPassword: (state, password) => { state.loginForm.password = password },
    toggleLoginFormValidation: (state) => { state.loginForm.validation = !state.loginForm.validation },
    clearLoginForm: (state) => {
        state.loginForm.validation = false
        state.loginForm.email = ''
        state.loginForm.loginId = ''
        state.loginForm.password = ''
    },
    clearLoginFormPassword: (state) => {
        state.loginForm.validation = false
        state.loginForm.password = ''
    },
    registerToken: loginForm.registerToken,
    // admin panel
    logout: adminPanel.logout,
    restoreToken: adminPanel.restoreToken
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
    state.dataSubmission = {
        function: null,
        inProgress: false
    }
    // header toolbar
    state.headerToolbarHeight = null
    state.mobileNavMenu = false
    // page footer
    state.pageFooterHeight = null
    // login form
    state.loginForm.validation = false
    state.loginForm.email = ''
    state.loginForm.loginId = ''
    state.loginForm.password = ''
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
