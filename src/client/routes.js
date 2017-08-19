import HomePage from './components/HomePage/HomePage.vue'
import ProductCatalog from './components/ProductCatalog/ProductCatalog.vue'
import Registration from './components/Registration/Registration.vue'
import ContactPage from './components/ContactPage/ContactPage.vue'
import AdminPanel from './components/AdminPanel/AdminPanel.vue'

module.exports = [{
    path: '/productCatalog',
    name: 'home',
    component: HomePage,
    menuText: 'HOME',
    menuIcon: 'home'
}, {
    path: '/productCatalog/products',
    name: 'products',
    component: ProductCatalog,
    menuText: 'CATALOG',
    menuIcon: 'view_list'
}, {
    path: '/productCatalog/register',
    name: 'register',
    component: Registration,
    menuText: 'REGISTER',
    menuIcon: 'recent_actors'
}, {
    path: '/productCatalog/contacts',
    name: 'contacts',
    component: ContactPage,
    menuText: 'CONTACT US',
    menuIcon: 'phone'
}, {
    path: '/productCatalog/admin',
    name: 'admin',
    component: AdminPanel,
    menuText: 'ADMIN',
    menuIcon: 'supervisor_account'
}, {
    path: '*',
    redirect: '/productCatalog',
    name: null,
    component: null,
    menuText: null,
    menuIcon: null
}]
