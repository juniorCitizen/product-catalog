import HomePage from './components/HomePage/HomePage.vue'
import ProductCatalog from './components/ProductCatalog/ProductCatalog.vue'
import Registration from './components/Registration/Registration.vue'
import ContactPage from './components/ContactPage/ContactPage.vue'
import AdminPanel from './components/AdminPanel/AdminPanel.vue'
import LoginForm from './components/LoginForm/LoginForm.vue'

module.exports = [{
    path: '/productCatalog',
    name: 'home',
    component: HomePage,
    caption: 'HOME',
    vCentered: true
}, {
    path: '/productCatalog/products',
    name: 'products',
    component: ProductCatalog,
    caption: 'CATALOG',
    vCentered: false
}, {
    path: '/productCatalog/register',
    name: 'register',
    component: Registration,
    caption: 'REGISTER',
    vCentered: false
}, {
    path: '/productCatalog/contacts',
    name: 'contacts',
    component: ContactPage,
    caption: 'CONTACT US',
    vCentered: false
}, {
    path: '/productCatalog/admin',
    name: 'admin',
    component: AdminPanel,
    caption: 'ADMIN',
    vCentered: false
}, {
    path: '/productCatalog/login',
    name: 'login',
    component: LoginForm,
    caption: 'LOGIN',
    vCentered: true
}, {
    path: '*',
    redirect: '/productCatalog',
    name: null,
    component: null,
    caption: null,
    vCentered: null
}]
