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
    return axios(axiosOptions)
}

/*
uploadImage: function ($event) {
    this.imageIdList = []
    let files = $event.target.files
    let uploadedImgData = new FormData()
    for (let counter = 0; counter < files.length; counter++) {
        uploadedImgData.append('prod-photo', files[counter])
    }
    let ajexOptions = {
        method: 'post',
        url: 'http://localhost/productCatalog/api/photos',
        data: uploadedImgData,
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios(ajexOptions)
        .then((response) => {
            response.data.data.map((record) => {
                this.imageIdList.push(record.id)
            })
            this.$emit('imageUploaded', this.imageIdList)
        }).catch((error) => {
            this.imageIdList = []
            alert(error) // catch your error
        })
},
submitProdData: function () {
    let ajaxOptions = {
        method: 'post',
        url: `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products`,
        data: {
            serieId: this.selectedSeries,
            type: this.prodType,
            itemCode: this.prodCode,
            name: this.prodName,
            text: this.prodDesc,
            photoIds: this.imageIdList
        }
    }
    axios(ajaxOptions)
        .then((serverResponse) => {
            alert('產品資料上傳成功')
            this.clearForm(0)
            this.isExistingRecord = false
            this.imageIdListUpdated = false
        })
        .catch((error) => {
            console.log(error)
            alert('系統錯誤，產品資料上傳失敗')
            this.clearForm(0)
            this.isExistingRecord = false
            this.imageIdListUpdated = false
        })
}
*/
