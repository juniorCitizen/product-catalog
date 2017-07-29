import Vue from 'vue'
import Vuex from 'vuex'

import eVars from '../../server/config/environment'
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
        currentView: 'home',
        mobileNavMode: false,
        productSeriesData: [],
        productCatalogData: [],
        activeProductSeriesId: 1,
        interestedItems: [],
        ajaxRequestPending: false,
        regions: [],
        countries: [],
        validatingUserData: false,
        resettingUserData: false, // pending deprecation
        userData: {
            id: null,
            company: '',
            name: '',
            email: '',
            region: 'All Regions',
            country: 'Country',
            comments: ''
        },
        alreadyRegistered: false, // pending deprecation
        registeredUserInfo: { // pending deprecation
            registrationId: null,
            validation: false,
            company: '',
            name: '',
            email: '',
            country: 'Country',
            comments: ''
        },
        officeLocationData: [{
            title: 'Taiwan Office',
            name: 'Gentry Way Co., Ltd.',
            address: 'No. 152, Wufu Road',
            town: 'Yanshui District',
            city: 'Tainan City',
            state: null,
            country: 'Taiwan R.O.C.',
            telephone: '+886-(0)6-6529052',
            fax: '+886-(0)6-6527093',
            website: `${eVars.HOST}:${eVars.PORT}`
        }, {
            title: 'China Office',
            name: 'Gentry Hardware Products Co., Ltd.',
            address: 'No. 158, Dong Cheng Road',
            town: 'Dong Sheng Town',
            city: 'Zhong Shan City',
            state: 'Guangdong Province',
            country: 'China',
            telephone: '+86-760-22229026 ~ 28',
            fax: '+86-760-22820916',
            website: `${eVars.HOST}:${eVars.PORT}`
        }],
        staffData: [{
            country: 'Taiwan R.O.C.',
            name: 'General Service',
            email: 'gentry88@ms46.hinet.net'
        }, {
            country: 'Taiwan R.O.C.',
            name: 'David Tsai',
            email: 'david.tsai@gentry-way.com.tw'
        }, {
            country: 'Taiwan R.O.C.',
            name: 'Cathy Liu',
            email: 'cathy.liu@gentry-way.com.tw'
        }, {
            country: 'Taiwan R.O.C.',
            name: 'Candy Wu',
            email: 'candy.wu@gentry-way.com.tw'
        }, {
            country: 'China',
            name: 'General Service',
            email: 'gentry@vip.163.com'
        }, {
            country: 'China',
            name: 'Johnson Wu',
            email: 'altecqc@msn.com'
        }],
        routes: routes
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
