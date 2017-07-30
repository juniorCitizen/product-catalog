import { regions, countries, filteredCountryList } from './countries/countries'
import {
    userData,
    userId,
    userCompany,
    userName,
    userEmail,
    userRegion,
    userCountry,
    userComments,
    userBotPrevention
} from './userData/userData'
import {
    fieldEvalState,
    readyToRegister,
    regCompletionFlag
} from './formSubmit/regProcStates'

export default {
    currentView: (state) => { return state.currentView },
    mobileNavMode: (state) => { return state.mobileNavMode },
    productSeriesData: (state) => { return state.productSeriesData },
    productCatalogData: (state) => { return state.productCatalogData },
    activeProductSeriesId: (state) => { return state.activeProductSeriesId },
    interestedItems: (state) => { return state.interestedItems },
    officeLocationData: (state) => { return state.officeLocationData },
    staffData: (state) => { return state.staffData },
    routes: (state) => { return state.routes },
    // region and country data set
    regions: regions,
    countries: countries,
    filteredCountryList: filteredCountryList,
    // user registration data
    userData: userData,
    userId: userId,
    userCompany: userCompany,
    userName: userName,
    userEmail: userEmail,
    userRegion: userRegion,
    userCountry: userCountry,
    userComments: userComments,
    userBotPrevention: userBotPrevention,
    // registration processing and progrss states
    validatingUserData: (state) => { return state.validatingUserData },
    fieldEvalState: fieldEvalState,
    readyToRegister: readyToRegister,
    ajaxRequestPending: (state) => { return state.ajaxRequestPending },
    regCompletionFlag: regCompletionFlag,
    // //////////////////////////////////////////////////////////
    // pending deprecation //////////////////////////////////////
    // //////////////////////////////////////////////////////////
    // resettingUserData: (state) => { return state.resettingUserData }, // pending deprecation
    registeredUserInfo: (state) => { return state.registeredUserInfo }, // pending deprecation
    alreadyRegistered: (state) => { return state.alreadyRegistered } // pending deprecation
}
