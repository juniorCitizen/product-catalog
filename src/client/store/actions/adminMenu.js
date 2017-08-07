import Promise from 'bluebird'

import mockAdminMenuRoot from './mockAdminMenuRoot'

export function refreshAdminMenuContent(context) {
    context
        .dispatch('fetchProductSeriesData')
        .then((apiResponse) => {
            context.commit('registerProductSeriesData', { productSeriesData: apiResponse.data.data })
            return context.dispatch('fetchProductCatalogData')
        })
        .then((apiResponse) => {
            context.commit('registerProductCatalogData', { productCatalogData: apiResponse.data.data })
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
            context.commit('registerAdminProductMenu', { adminMenuRootData: [] })
            console.log(error)
        })
}
