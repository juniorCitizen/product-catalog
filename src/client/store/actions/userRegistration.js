import axios from 'axios'

import eVars from '../../../server/config/environment'

export default (context) => {
    // console.log(context)
    context.commit('turnOnUserDataValidation')
    let getters = context.getters
    if (getters.readyToRegister) {
        let axiosOptions = {
            method: 'post',
            url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/users`,
            data: {
                company: getters.userCompany,
                name: getters.userName,
                email: getters.userEmail,
                country: getters.userCountry,
                comments: getters.userComments.length === 0 ? null : getters.userComments,
                botPrevention: getters.userBotPrevention
            }
        }
        context.commit('switchOffMobileNavMode')
        context.commit('turnOffUserDataValidation')
        context.commit('setAjaxPendingState', true)
        axios(axiosOptions)
            .then((apiResponse) => {
                let registrationRecord = apiResponse.data.data
                context.commit('updateUserData', registrationRecord)
                context.commit('setAjaxPendingState', false)
            })
            .catch((error) => {
                console.log(error)
                context.commit('resetUserData')
                context.commit('setAjaxPendingState', false)
            })
    }
}
