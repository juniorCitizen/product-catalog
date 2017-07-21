import axios from 'axios'

import eVars from '../../server/config/environment'

export default {
    fetchProductSeriesData: fetchProductSeriesData,
    fetchProductCatalogData: fetchProductCatalogData
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
