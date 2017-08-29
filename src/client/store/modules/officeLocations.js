import axios from 'axios'
import eVars from '../../../server/config/environment'

export default {
    namespaced: true,
    actions: {
        fetch: (context) => {
            let options = {
                method: 'get',
                url: `${eVars.API_URL}/countries/officeLocations`
            }
            return axios(options)
        }
    },
    getters: {
        officeLocations: state => state.officeLocations
    },
    mutations: {
        register: (state, officeLocations) => {
            state.officeLocations = officeLocations
        },
        reset: (state) => {
            state.officeLocations = []
        }
    },
    state: {
        officeLocations: []
    }
}
