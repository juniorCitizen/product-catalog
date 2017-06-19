// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    render: (h) => h(App)
})
