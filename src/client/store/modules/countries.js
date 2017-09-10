import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    state: {
        data: [],
        apiUrl: `${eVars.API_URL}/countries`
    },
    mutations: {
        register: (state, countriesData) => {
            state.data = countriesData
        },
        reset: (state) => {
            state.data = []
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
