import HomePage from './components/HomePage/HomePage.vue'
import ProductCatalog from './components/productCatalog/ProductCatalog.vue'
import Registration from './components/Registration/Registration.vue'
import ContactPage from './components/ContactPage/ContactPage.vue'
import AdminPanel from './components/AdminPanel/AdminPanel.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomePage,
    menuText: 'HOME'
}, {
    path: '/products',
    name: 'products',
    component: ProductCatalog,
    menuText: 'CATALOG'
}, {
    path: '/register',
    name: 'register',
    component: Registration,
    menuText: 'REGISTER'
}, {
    path: '/contacts',
    name: 'contacts',
    component: ContactPage,
    menuText: 'CONTACT US'
}, {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    menuText: 'ADMIN'
}, {
    path: '*',
    redirect: '/',
    name: null,
    component: null,
    menuText: null
}]

export default routes
