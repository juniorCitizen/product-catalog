export function registerAdminProductMenu(state, payload) {
    state.adminMenu = payload.adminMenuRootData
    if (
        (state.productSeriesData.length > 0) &&
        (state.productCatalogData.length > 0)
    ) {
        state.productSeriesData.forEach((productSeries) => {
            state.adminMenu[0].submenu.push({
                title: productSeries.reference,
                active: false,
                hover: false,
                submenu: [],
                data: productSeries
            })
        })
        state.productCatalogData.forEach((productsInSeries, indexCounter) => {
            state.adminMenu[0].submenu[indexCounter].submenu = []
            if (productsInSeries.products.length > 0) {
                productsInSeries.products.forEach((product) => {
                    state.adminMenu[0].submenu[indexCounter].submenu.push({
                        title: product.itemCode,
                        active: false,
                        hover: false,
                        submenu: [],
                        data: product
                    })
                })
            }
        })
    }
}
