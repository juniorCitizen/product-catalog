import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

export default {
    userLogin: userLogin
}

function userLogin(context) {
    if (context.state.loginForm.validation) {
        context.commit('toggleLoginFormValidation')
        context.commit('toggleDataSubmissionState')
        return axios({
            method: 'post',
            url: `${eVars.HOST}/${eVars.SYS_REF}/api/token`,
            data: context.state.loginForm
        }).then((token) => {
            context.commit('clearLoginForm')
            context.commit('resetDataSubmissionState')
            context.commit('registerNewToken', token.data.data.token)
            context.commit('restoreToken')
            return Promise.resolve()
        }).catch((error) => {
            context.commit('clearLoginFormPassword')
            context.commit('resetDataSubmissionState')
            return Promise.reject(error)
        })
    }
}
