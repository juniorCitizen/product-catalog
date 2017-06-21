import axios from 'axios'

export default {
    ajaxProdSeries: ajaxProdSeries
}

function ajaxProdSeries(context) {
    let ajaxOptions = {
        method: 'get',
        url: 'http://localhost/productCatalog/api/series'
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
