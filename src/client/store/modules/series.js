import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    actions: {
        fetch: (context) => {
            let options = {
                method: 'get',
                url: `${eVars.API_URL}/products/series`
            }
            return axios(options)
        }
    },
    getters: {
        series: state => state.series
    },
    mutations: {
        register: (state, series) => {
            state.series = series
        },
        reset: (state) => {
            state.series = []
        }
    },
    state: {
        series: []
    }
}
