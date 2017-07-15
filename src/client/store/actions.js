import axios from 'axios'

import eVars from '../../server/config/environment'

export default {
    getProdSeriesList: getProdSeriesList,
    getFullProdData: getFullProdData
}

function getFullProdData(context, serieId) {
    let axiosOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`
    }
    return axios(axiosOptions)
}

function getProdSeriesList(context) {
    let axiosOptions = {
        method: 'get',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/series`
    }
    return axios(axiosOptions)
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
