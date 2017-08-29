import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    actions: {
        fetch: (context) => {
            let options = {
                method: 'get',
                url: `${eVars.API_URL}/products`
            }
            return axios(options)
        }
    },
    getters: {
        products: state => state.products
    },
    mutations: {
        register: (state, products) => {
            state.products = products
        },
        reset: (state) => {
            state.products = []
        }
    },
    state: {
        products: []
    }
}
