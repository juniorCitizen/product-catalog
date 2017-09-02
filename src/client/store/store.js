import Vue from 'vue'
import Vuex from 'vuex'

import eVars from '../../server/config/environment'

import actions from './actions/actions'
import viewportModule from './modules/viewport'
import mobileNavMenuModule from './modules/mobileNavMenu'
import regionsModule from './modules/regions'
import countriesModule from './modules/countries'
import officeLocationsModule from './modules/officeLocations'
import seriesModule from './modules/series'
import productsModule from './modules/products'
import loginFormModule from './modules/loginForm'
import flowControlModule from './modules/flowControl'
import credentialsModule from './modules/credentials'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: eVars.NODE_ENV !== 'production',
    modules: {
        viewport: viewportModule,
        mobileNavMenu: mobileNavMenuModule,
        regions: regionsModule,
        countries: countriesModule,
        officeLocations: officeLocationsModule,
        series: seriesModule,
        products: productsModule,
        loginForm: loginFormModule,
        flowControl: flowControlModule,
        credentials: credentialsModule
    },
    actions: actions,
    getters: {},
    mutations: {},
    state: {}
})

export default store

// store hot-reloading related code
if (module.hot) {
    module.hot.accept([
        './modules/viewport',
        './modules/mobileNavMenu',
        './modules/regions',
        './modules/countries',
        './modules/officeLocations',
        './modules/series',
        './modules/products',
        './modules/loginForm',
        './modules/flowControl',
        './modules/credentials',
        './actions/actions'
    ], () => {
        const newViewportModule = require('./modules/viewport').default
        const newMobileNavMenuModule = require('./modules/mobileNavMenu').default
        const newRegionsModule = require('./modules/regions').default
        const newCountriesModule = require('./modules/countries').default
        const newOfficeLocationsModule = require('./modules/officeLocations').default
        const newSeriesModule = require('./modules/series').default
        const newProductsModule = require('./modules/products').default
        const newLoginFormModule = require('./modules/loginForm').default
        const newFlowControlModule = require('./modules/flowControl').default
        const newCredentialModules = require('./modules/credentials').default
        const newActions = require('./actions/actions').default
        store.hotUpdate({
            actions: newActions,
            modules: {
                viewport: newViewportModule,
                mobileNavMenu: newMobileNavMenuModule,
                regions: newRegionsModule,
                countries: newCountriesModule,
                officeLocations: newOfficeLocationsModule,
                series: newSeriesModule,
                products: newProductsModule,
                loginForm: newLoginFormModule,
                flowControl: newFlowControlModule,
                credentials: newCredentialModules
            }
        })
    })
}
