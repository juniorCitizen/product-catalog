import HomePage from './components/HomePage.vue'
import ProductCatalog from './components/ProductCatalog.vue'
import ContactPage from './components/ContactPage.vue'
import AdminPanel from './components/adminPanel/AdminPanel.vue'
// import Inquiry from './components/Inquiry.vue'
// import ProductDetails from './components/ProductDetails.vue'

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

export default routes
