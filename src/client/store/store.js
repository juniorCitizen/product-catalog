import { decode } from 'jsonwebtoken'
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions/actions'
import eVars from '../../server/config/environment'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import routes from '../routes'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: {
        // routing
        routes: routes,
        // api resources
        clientAccessUrl: `${eVars.NODE_ENV === 'production' ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}`,
        apiUrl: `${eVars.NODE_ENV === 'production' ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}/api`,
        regions: [],
        countries: [],
        officeLocations: [],
        series: [],
        products: [],
        dataSubmission: {
            function: null,
            inProgress: false
        },
        // viewport management
        // windowsInnerWidth: null,
        // windowsInnerHeight: null,
        clientWidth: null,
        clientHeight: null,
        // header toolbar
        headerToolbarHeight: null,
        mobileNavMenu: false,
        // page footer
        pageFooterHeight: null,
        // login form
        loginForm: {
            validation: false,
            email: '',
            loginId: '',
            password: ''
        },
        // admin panel
        jwt: sessionStorage.jwt || null,
        email: sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.email : null,
        loginId: sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.loginId : null
    }
})

export default store

// store hot-reloading related code
if (module.hot) {
    module.hot.accept([
        './actions/actions',
        './getters/getters',
        './mutations/mutations'
    ], () => {
        const newActions = require('./actions/actions').default
        const newGetters = require('./getters/getters').default
        const newMutations = require('./mutations/mutations').default
        store.hotUpdate({
            actions: newActions,
            getters: newGetters,
            mutations: newMutations
        })
    })
}
