import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    state: {
        data: [],
        apiUrl: `${eVars.API_URL}/products`
    },
    mutations: {
        register: (state, products) => {
            state.data = products
        },
        reset: (state) => {
            state.data = []
        },
        addProduct: (state, product) => {
            state.data.push(product)
            state.data.sort((a, b) => {
                if (a.code.toLowerCase() > b.code.toLowerCase()) {
                    return 1
                } else if (a.code.toLowerCase() > b.code.toLowerCase()) {
                    return -1
                } else {
                    return 0
                }
            })
        }
    },
    getters: {
        data: state => state.data,
        apiUrl: state => state.apiUrl
    },
    actions: {
        fetch: (context) => {
            return axios({
                method: 'get',
                url: context.state.apiUrl
            })
        }
    }
}
