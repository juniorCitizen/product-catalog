// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import actions from './store/actions/actions'
import getters from './store/getters/getters'
import mutations from './store/mutations/mutations'
import routes from './routes'

import Axios from './plugins/axios'
// import EVars from './plugins/eVars'
// import { MediaQueries } from './plugins/mediaQueries'
// import ResponsiveBands from './mixins/responsiveBands'
import App from './components/App.vue'

// const mediaQueries = new MediaQueries({ bands: ResponsiveBands })

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(Axios, '$axios')
// Vue.use(EVars, '$eVars')
// Vue.use(mediaQueries)
// Vue.mixin(ResponsiveBands.mixin)

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

const store = new Vuex.Store({
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: {
        // routing
        routes: routes
    }
})

// store hot-reloading related code
if (module.hot) {
    module.hot.accept([
        './store/actions/actions',
        './store/getters/getters',
        './store/mutations/mutations'
    ], () => {
        const newActions = require('./store/actions/actions').default
        const newGetters = require('./store/getters/getters').default
        const newMutations = require('./store/mutations/mutations').default
        store.hotUpdate({
            actions: newActions,
            getters: newGetters,
            mutations: newMutations
        })
    })
}

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    store,
    // mediaQueries: mediaQueries,
    render: (h) => h(App)
})
