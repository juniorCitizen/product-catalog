// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import HomePage from './components/HomePage.vue'
import ProductCatalog from './components/ProductCatalog.vue'
import ContactPage from './components/ContactPage.vue'
import AdminPanel from './components/AdminPanel.vue'
// import Inquiry from './components/Inquiry.vue'
// import ProductDetails from './components/ProductDetails.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomePage
}, {
    path: '/products',
    name: 'products',
    component: ProductCatalog
}, {
    path: '/contacts',
    name: 'contacts',
    component: ContactPage
}, {
    path: '/admin',
    name: 'admin',
    component: AdminPanel
}, {
    path: '*',
    redirect: '/'
}]
// { path: '/inquiry', name: 'inquiry', component: Inquiry },
// { path: '/products/:productId', name: 'prodDetails', component: ProductDetails },

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    render: (h) => h(App)
})
