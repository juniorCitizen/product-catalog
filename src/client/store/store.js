import Vue from 'vue'
import Vuex from 'vuex'

import eVars from '../../server/config/environment'

import adminPanelActions from './actions/adminPanel'
import adminPanelGetters from './getters/adminPanel'
import adminPanelMutations from './mutations/adminPanel'
import adminPanelState from './state/adminPanel'
// import adminPanelMenuActions from './actions/adminPanelMenu'
// import adminPanelMenuGetters from './getters/adminPanelMenu'
import adminPanelMenuMutations from './mutations/adminPanelMenu'
import adminPanelMenuState from './state/adminPanelMenu'
// import productDataFormActions from './actions/productDataForm'
import productDataFormGetters from './getters/productDataForm'
import productDataFormMutations from './mutations/productDataForm'
import productDataFormState from './state/productDataForm'
import routingState from './state/routing'
import regionsModule from './modules/regions'
import countriesModule from './modules/countries'
import officeLocationsModule from './modules/officeLocations'
import seriesModule from './modules/series'
import productsModule from './modules/products'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: eVars.NODE_ENV !== 'production',
    modules: {
        adminPanel: {
            namespaced: true,
            actions: adminPanelActions,
            getters: adminPanelGetters,
            mutations: adminPanelMutations,
            state: adminPanelState
        },
        adminPanelMenu: {
            namespaced: true,
            actions: {},
            getters: { rootMenu: state => state.rootMenu },
            mutations: adminPanelMenuMutations,
            state: adminPanelMenuState
        },
        flowControl: {
            namespaced: true,
            actions: {},
            getters: { ajaxInProgress: state => state.ajaxInProgress },
            mutations: {
                on: (state) => { state.ajaxInProgress = true },
                off: (state) => { state.ajaxInProgress = false }
            },
            state: { ajaxInProgress: false }
        },
        productDataForm: {
            namespaced: true,
            actions: {},
            getters: productDataFormGetters,
            mutations: productDataFormMutations,
            state: productDataFormState
        },
        routing: {
            namespaced: true,
            actions: {},
            getters: { routes: state => state.routes },
            mutations: {},
            state: routingState
        },
        viewport: {
            namespaced: true,
            actions: {},
            getters: {
                clientWidth: state => state.clientWidth,
                clientHeight: state => state.clientHeight,
                headerToolbarHeight: state => state.headerToolbarHeight,
                pageFooterHeight: state => state.pageFooterHeight,
                mobileNavMode: state => state.mobileNavMode
            },
            mutations: {
                register: (state, payload) => {
                    state[payload.property] = payload.value
                },
                toggleMobileNavMode: (state) => {
                    state.mobileNavMode = !state.mobileNavMode
                },
                mobileNavModeOn: (state) => { state.mobileNavMode = true },
                mobileNavModeOff: (state) => { state.mobileNavMode = false }
            },
            state: {
                clientWidth: null,
                clientHeight: null,
                headerToolbarHeight: null,
                pageFooterHeight: null,
                // switches
                mobileNavMode: false
            }
        },
        regions: regionsModule,
        countries: countriesModule,
        officeLocations: officeLocationsModule,
        series: seriesModule,
        products: productsModule
    },
    actions: {},
    getters: {},
    mutations: {},
    state: {}
})

export default store

// store hot-reloading related code
if (module.hot) {
    module.hot.accept([
        './actions/adminPanel',
        './getters/adminPanel',
        './mutations/adminPanel',
        './mutations/adminPanelMenu',
        './getters/productDataForm',
        './mutations/productDataForm',
        './modules/regions',
        './modules/countries',
        './modules/officeLocations',
        './modules/series',
        './modules/products'
    ], () => {
        const newAdminPanelActions = require('./actions/adminPanel').default
        const newAdminPanelGetters = require('./getters/adminPanel').default
        const newAdminPanelMutations = require('./mutations/adminPanel').default
        const newAdminPanelMenuMutations = require('./mutations/adminPanelMenu').default
        const newProductDataFormGetters = require('./getters/productDataForm').default
        const newProductDataFormMutations = require('./mutations/productDataForm').default
        const newRegionsModule = require('./modules/regions').default
        const newCountriesModule = require('./modules/countries').default
        const newOfficeLocationsModule = require('./modules/officeLocations').default
        const newSeriesModule = require('./modules/series').default
        const newProductsModule = require('./modules/products').default
        store.hotUpdate({
            modules: {
                adminPanel: {
                    actions: newAdminPanelActions,
                    getters: newAdminPanelGetters,
                    mutations: newAdminPanelMutations
                },
                adminPanelMenu: {
                    mutations: newAdminPanelMenuMutations
                },
                productDataForm: {
                    getters: newProductDataFormGetters,
                    mutations: newProductDataFormMutations
                },
                regions: newRegionsModule,
                countries: newCountriesModule,
                officeLocations: newOfficeLocationsModule,
                series: newSeriesModule,
                products: newProductsModule
            }
        })
    })
}
