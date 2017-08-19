import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

const apiUrlPrefix = `${eVars.NODE_ENV === 'production' ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}/api`

export default {
    // utility functions
    appInit: appInit,
    // api recordsets
    fetchCompanyStaffMembers: fetchCompanyStaffMembers

}

// utility functions
function appInit(context) {
    context.commit('clearStore')
    let initProcedures = []
    initProcedures.push({
        dispatch: context.dispatch('fetchCompanyStaffMembers'),
        commit: 'registerCompanyStaffMembers'
    })
    Promise
        .each(initProcedures, (initProcedure) => {
            return initProcedure.dispatch
        })
        .then((initProcedureResults) => {
            console.log(initProcedureResults[0].dispatch)
        })
        .catch((error) => {
            alert('App initialization failure...')
            console.log(error)
        })
}

// api recordsets
function fetchCompanyStaffMembers(context) {
    let axiosOptions = {
        method: 'get',
        url: `${apiUrlPrefix}/users/companyStaffMembers`
    }
    return axios(axiosOptions)
}
