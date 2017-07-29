import { regions, countries, filteredCountryList } from './countries/countries'
import {
    userData,
    userId,
    userCompany,
    userName,
    userEmail,
    userRegion,
    userCountry,
    userComments
} from './userData/userData'

export default {
    currentView: (state) => { return state.currentView },
    mobileNavMode: (state) => { return state.mobileNavMode },
    productSeriesData: (state) => { return state.productSeriesData },
    productCatalogData: (state) => { return state.productCatalogData },
    activeProductSeriesId: (state) => { return state.activeProductSeriesId },
    interestedItems: (state) => { return state.interestedItems },
    ajaxRequestPending: (state) => { return state.ajaxRequestPending },
    alreadyRegistered: (state) => { return state.alreadyRegistered },
    regions: regions,
    countries: countries,
    filteredCountryList: filteredCountryList,
    validatingUserData: (state) => { return state.validatingUserData },
    // resettingUserData: (state) => { return state.resettingUserData }, // pending deprecation
    userData: userData,
    userId: userId,
    userCompany: userCompany,
    userName: userName,
    userEmail: userEmail,
    userRegion: userRegion,
    userCountry: userCountry,
    userComments: userComments,
    officeLocationData: (state) => { return state.officeLocationData },
    staffData: (state) => { return state.staffData },
    routes: (state) => { return state.routes },
    // //////////////////////////////////////
    registeredUserInfo: (state) => { return state.registeredUserInfo } // pending deprecation
}
