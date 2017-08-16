import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

import userRegistration from './userRegistration'
import submitProductData from './submitProductData'
import deleteProductData from './deleteProductData'
import serviceLocations from './serviceLocations'
import staffContactInfo from './staffContactInfo'
import mockAdminMenuRoot from './mockAdminMenuRoot'
import { refreshAdminMenuContent } from './adminMenu'

// const urlPrefix = `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}`
const urlPrefix = `${eVars.HOST}/${eVars.SYS_REF}`

export default {
    appInit: appInit,
    fetchProductSeriesData: fetchProductSeriesData,
    fetchProductCatalogData: fetchProductCatalogData,
    fetchCountryData: fetchCountryData,
    fetchRegionData: fetchRegionData,
    userRegistration: userRegistration,
    submitProductData: submitProductData,
    deleteProductData: deleteProductData,
    refreshAdminMenuContent: refreshAdminMenuContent
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
    context.dispatch('fetchProductSeriesData')
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
            return Promise.resolve(mockAdminMenuRoot) // mock admin menu data
        })
        .then((mockAPIResponse) => {
            context.commit('registerAdminProductMenu', {
                adminMenuRootData: mockAPIResponse
            })
        })
        .catch((error) => {
            context.commit('registerProductSeriesData', { productSeriesData: [] })
            context.commit('registerProductCatalogData', { productCatalogData: [] })
            context.commit('registerRegionData', { regionData: [] })
            context.commit('registerCountryData', { countryData: [] })
            console.log(error)
        })
}
