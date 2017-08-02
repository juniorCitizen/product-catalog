import axios from 'axios'

import eVars from '../../../server/config/environment'

import userRegistration from './userRegistration'
import submitProductData from './submitProductData'
import serviceLocations from './serviceLocations'
import staffContactInfo from './staffContactInfo'

const urlPrefix = `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}`

export default {
    appInit: appInit,
    fetchProductSeriesData: fetchProductSeriesData,
    fetchProductCatalogData: fetchProductCatalogData,
    fetchCountryData: fetchCountryData,
    fetchRegionData: fetchRegionData,
    userRegistration: userRegistration,
    submitProductData: submitProductData
}

function fetchProductSeriesData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${urlPrefix}/api/series`
    }
    return axios(axiosOptions)
}

function fetchProductCatalogData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${urlPrefix}/api/products`
    }
    return axios(axiosOptions)
}

function fetchRegionData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${urlPrefix}/api/countries/regions`
    }
    return axios(axiosOptions)
}

function fetchCountryData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${urlPrefix}/api/countries`
    }
    return axios(axiosOptions)
}

function appInit(context) {
    context.commit('registerStaffContactInfo', staffContactInfo)
    context.commit('registerServiceLocationData', serviceLocations)
    return context.dispatch('fetchProductSeriesData')
        .then((apiResponse) => {
            context.commit('registerProductSeriesData', { productSeriesData: apiResponse.data.data })
            return context.dispatch('fetchProductCatalogData')
        })
        .then((apiResponse) => {
            context.commit('registerProductCatalogData', { productCatalogData: apiResponse.data.data })
            return context.dispatch('fetchRegionData')
        })
        .then((apiResponse) => {
            context.commit('registerRegionData', { regionData: apiResponse.data.data })
            return context.dispatch('fetchCountryData')
        })
        .then((apiResponse) => {
            context.commit('registerCountryData', { countryData: apiResponse.data.data })
        })
        .catch((error) => {
            context.commit('registerProductSeriesData', { productSeriesData: [] })
            context.commit('registerProductCatalogData', { productCatalogData: [] })
            context.commit('registerRegionData', { regionData: [] })
            context.commit('registerCountryData', { countryData: [] })
            console.log(error)
        })
}
