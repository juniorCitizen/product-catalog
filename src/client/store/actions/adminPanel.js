import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

export default {
    login: (context) => {
        if (context.getters.formValidated()) {
            return axios({
                method: 'post',
                url: `${eVars.API_URL}/token`,
                data: context.getters.formData
            }).then((token) => {
                context.commit('resetForm')
                context.commit('registerJwt', token.data.data.token)
                return Promise.resolve()
            }).catch((error) => {
                context.commit('registerPassword', '')
                return Promise.reject(error)
            })
        }
    }
}
