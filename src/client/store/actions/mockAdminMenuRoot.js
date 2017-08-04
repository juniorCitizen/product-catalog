export default (() => {
    let adminMenuRoot = [{
        title: 'PRODUCT SERIES',
        active: false,
        hover: false,
        submenu: []
    }, {
        title: 'PENDING',
        active: false,
        hover: false,
        submenu: []
    }]
    return adminMenuRoot.slice(0)
})()
