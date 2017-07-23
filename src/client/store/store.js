import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: {
        currentView: 'home',
        productSeriesData: [],
        productCatalogData: [],
        activeProductSeriesId: 1,
        interestedItems: [],
        ajaxRequestPending: false,
        alreadyRegistered: false,
        countries: [],
        regions: ['All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
        registeredUserInfo: {
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
