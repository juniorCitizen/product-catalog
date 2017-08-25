import { decode } from 'jsonwebtoken'
import routes from '../../routes'

import { logout, restoreToken } from './adminPanel'

export default {
    // utility functions
    clearStore: clearStore,
    // api recordsets
    registerRegions: registerRegions,
    registerCountries: registerCountries,
    registerOfficeLocations: registerOfficeLocations,
    registerSeries: registerSeries,
    registerProducts: registerProducts,
    // admin panel
    logout: logout,
    restoreToken: restoreToken
}

// utility functions
function clearStore(state) {
    // routing
    state.routes = routes
    // api recordsets
    state.regions = []
    state.countries = []
    state.officeLocations = []
    state.series = []
    state.products = []
    // admin
    state.jwt = sessionStorage.jwt || null
    state.email = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.email : null
    state.loginId = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.loginId : null
}

// api recordsets
function registerRegions(state, data) {
    data.forEach((entry) => {
        state.regions.push(entry.region)
    })
}

function registerCountries(state, data) { state.countries = data }

function registerOfficeLocations(state, data) { state.officeLocations = data }

function registerSeries(state, data) { state.series = data }

function registerProducts(state, data) { state.products = data }
