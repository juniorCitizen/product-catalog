import axios from 'axios'

import eVars from '../../../server/config/environment'

export default (context, productId) => {
    let axiosOptions = {
        method: 'delete',
        // url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products?productId=${productId}`
        url: `${eVars.HOST}/${eVars.SYS_REF}/api/products?productId=${productId}`
    }
    context.commit('setAjaxPendingState', true)
    return axios(axiosOptions)
}
