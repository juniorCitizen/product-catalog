import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    actions: {
        fetch: (context) => {
            let options = {
                method: 'get',
                url: `${eVars.API_URL}/countries/regions`
            }
            return axios(options)
        }
    },
    getters: {
        regions: state => state.regions
    },
    mutations: {
        register: (state, regions) => {
            state.regions = regions
        },
        reset: (state) => {
            state.regions = []
        }
    },
    state: {
        regions: []
    }
}
