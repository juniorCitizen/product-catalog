import axios from 'axios'

import eVars from '../../server/config/environment'

export default {
    getProdSeriesList: getProdSeriesList,
    getFullProdData: getFullProdData
}

function getFullProdData(context, serieId) {
    let ajaxOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`
    }
    return axios(ajaxOptions)
}

function getProdSeriesList(context) {
    let ajaxOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/series`
    }
    return axios(ajaxOptions)
        .then((apiResponse) => {
            context.commit({
                type: 'updateProdSeries',
                prodSeries: apiResponse.data.data
            })
        }).catch((error) => {
            context.commit({
                type: 'updateProdSeries',
                prodSeries: []
            })
            console.log(error)
        })
}
