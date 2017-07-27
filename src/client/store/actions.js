import axios from 'axios'

import eVars from '../../server/config/environment'

export default {
    fetchProductSeriesData: fetchProductSeriesData,
    fetchProductCatalogData: fetchProductCatalogData,
    fetchCountryData: fetchCountryData,
    fetchRegionData: fetchRegionData
}

function fetchProductSeriesData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/series`
    }
    axios(axiosOptions)
        .then((apiResponse) => {
            context.commit({
                type: 'registerProductSeriesData',
                productSeriesData: apiResponse.data.data
            })
        }).catch((error) => {
            context.commit({
                type: 'registerProductSeriesData',
                productSeriesData: []
            })
            console.log(error)
        })
}

function fetchProductCatalogData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`
    }
    axios(axiosOptions)
        .then((apiResponse) => {
            context.commit({
                type: 'registerProductCatalogData',
                productCatalogData: apiResponse.data.data
            })
        }).catch((error) => {
            context.commit({
                type: 'registerProductCatalogData',
                productCatalogData: []
            })
            console.log(error)
        })
}

function fetchCountryData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/countries`
    }
    axios(axiosOptions)
        .then((apiResponse) => {
            context.commit({
                type: 'registerCountryData',
                countryData: apiResponse.data.data
            })
        }).catch((error) => {
            context.commit({
                type: 'registerCountryData',
                countryData: []
            })
            console.log(error)
        })
}

function fetchRegionData(context) {
    let axiosOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/countries/regions`
    }
    axios(axiosOptions)
        .then((apiResponse) => {
            context.commit({
                type: 'registerRegionData',
                regionData: apiResponse.data.data
            })
        }).catch((error) => {
            context.commit({
                type: 'registerRegionData',
                regionData: []
            })
            console.log(error)
        })
}
