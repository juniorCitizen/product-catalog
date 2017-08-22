import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import routes from './routes'

import Axios from './plugins/axios'
import EVars from './plugins/eVars'
import { MediaQueries } from './plugins/mediaQueries'
import ResponsiveBands from './mixins/responsiveBands'
import App from './components/App.vue'

const mediaQueries = new MediaQueries({ bands: ResponsiveBands })

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Axios, '$axios')
Vue.use(EVars, '$eVars')
Vue.use(mediaQueries)
Vue.mixin(ResponsiveBands.mixin)

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    mediaQueries: mediaQueries,
    render: (h) => h(App)
})
