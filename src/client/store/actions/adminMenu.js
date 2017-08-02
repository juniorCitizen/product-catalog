import Promise from 'bluebird'

let rootSections = [{
    title: 'PRODUCT SERIES',
    active: false,
    hovering: false,
    parentId: null,
    childId: null,
    predecessor: null,
    successor: 1
}, {
    title: 'PENDING',
    submenu: null,
    active: false,
    hovering: false,
    parentId: null,
    childId: null,
    predecessor: 0,
    successor: null
}]

export function generateAdminMenu(context) {
    let adminMenu = rootSections.slice()
    context.state.productSeriesData.forEach((productSeries, index, array) => {
        adminMenu.push({
            title: productSeries.reference,
            active: false,
            hovering: false,
            parent: 0,
            child: null,
            predecessor: (index === 0) ? null : (index - 1),
            successor: ((index + 1) < array.length) ? (index + 1) : null,
            productSeries: productSeries
        })
    })
    return Promise.resolve(adminMenu)
}
