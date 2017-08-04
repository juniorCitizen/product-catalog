import axios from 'axios'

import eVars from '../../../server/config/environment'

export default (context, payload) => {
    // console.log(payload)
    let productData = new FormData()
    productData.append('primaryPhoto', payload.primaryPhoto[0])
    if (payload.secondaryPhotos.length > 1) {
        for (let counter = 0; counter < payload.secondaryPhotos.length; counter++) {
            productData.append('secondaryPhotos', payload.secondaryPhotos[counter])
        }
    }
    productData.append('seriesId', payload.productSeriesId)
    productData.append('type', payload.productType)
    productData.append('itemCode', payload.productCode)
    productData.append('name', payload.productName)
    productData.append('text', payload.productDescription)
    // console.log(productData)
    let axiosOptions = {
        method: 'post',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`,
        data: productData,
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    context.commit('setAjaxPendingState', true)
    return axios(axiosOptions)
}
