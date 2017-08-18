import axios from 'axios'

import eVars from '../config/environment'

module.exports = (() => {
    let axiosOptions = {
        method: 'get',
        url: `http://localhost/register?reference=${eVars.SYS_REF}&proxyPath=/${eVars.SYS_REF}&targetUrl=${eVars.REMOTE_DEV_HOST}:${eVars.PORT}`
    }
    return axios(axiosOptions)
        .then((response) => {
            return {
                registrationStatus: true,
                message: response
            }
        })
        .catch((error) => {
            return {
                registrationStatus: false,
                error: error
            }
        })
})()
