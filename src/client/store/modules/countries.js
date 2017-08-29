import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    actions: {
        fetch: (context) => {
            let options = {
                method: 'get',
                url: `${eVars.API_URL}/countries`
            }
            return axios(options)
        }
    },
    getters: {
        countries: state => state.countries
    },
    mutations: {
        register: (state, countries) => {
            state.countries = countries
        },
        reset: (state) => {
            state.countries = []
        }
    },
    state: {
        countries: []
    }
}
