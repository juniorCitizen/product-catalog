import Vue from 'vue'
import Vuex from 'vuex'

import routes from '../routes'

import actions from './actions/actions'
import getters from './getters/getters'
import mutations from './mutations/mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: {
        // routing management
        routes: routes,
        currentView: 'home',
        mobileNavMode: false,
        productSeriesData: [],
        productCatalogData: [],
        activeProductSeriesId: 1,
        interestedItems: [],
        regions: [],
        countries: [],
        validatingUserData: false,
        ajaxRequestPending: false,
        userData: {
            id: null,
            company: '',
            name: '',
            email: '',
            region: 'All Regions',
            country: 'Country',
            comments: '',
            botPrevention: ''
        },
        // contact and service location info
        inViewOfficeId: 0,
        officeLocationData: [],
        staffData: [],
        // admin page vertical menu
        adminMenu: [],
        // /////////////////////////////////////////////
        // pending deprecation /////////////////////////
        // /////////////////////////////////////////////
        resettingUserData: false, // pending deprecation
        alreadyRegistered: false, // pending deprecation
        registeredUserInfo: { // pending deprecation
            registrationId: null,
            validation: false,
            company: '',
            name: '',
            email: '',
            country: 'Country',
            comments: ''
        }
    }
})

export default store

// if (module.hot) {
//     module.hot.accept(['./getters', './actions', './mutations'], () => {
//         store.hotUpdate({
//             getters: require('./getters'),
//             actions: require('./actions'),
//             mutations: require('./mutations')
//         })
//     })
// }
