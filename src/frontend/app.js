// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import AdminPanel from './components/AdminPanel.vue'
import ContactPage from './components/ContactPage.vue'
import HomePage from './components/HomePage.vue'
import Inquiry from './components/Inquiry.vue'
import ProductCatalog from './components/ProductCatalog.vue'
import ProductDetails from './components/ProductDetails.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/productCatalog', component: HomePage },
    { path: '/productCatalog/admin', component: AdminPanel },
    { path: '/productCatalog/contacts', component: ContactPage },
    { path: '/productCatalog/inquiry', component: Inquiry },
    { path: '/productCatalog/products', component: ProductCatalog },
    { path: '/productCatalog/products/:productId', component: ProductDetails },
    { path: '*', redirect: '/productCatalog' }
]

const router = new VueRouter({ routes: routes, mode: 'history' })

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    render: (h) => h(App)
})
