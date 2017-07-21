import HomePage from './components/HomePage.vue'
import ProductCatalog from './components/productCatalog/ProductCatalog.vue'
import ContactPage from './components/contactPage/ContactPage.vue'
import AdminPanel from './components/adminPanel/AdminPanel.vue'

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

export default routes
