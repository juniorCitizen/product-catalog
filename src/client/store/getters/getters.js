export default {
    // routing
    routes: (state) => { return state.routes },
    // api resources
    clientAccessUrl: (state) => { return state.clientAccessUrl },
    apiUrl: (state) => { return state.apiUrl },
    officeLocations: (state) => { return state.officeLocations },
    // viewport management
    // windowsInnerWidth: (state) => { return state.windowsInnerWidth },
    // windowsInnerHeight: (state) => { return state.windowsInnerHeight },
    clientWidth: (state) => { return state.clientWidth },
    clientHeight: (state) => { return state.clientHeight },
    // header toolbar
    headerToolbarHeight: (state) => { return state.headerToolbarHeight },
    mobileNavMenu: (state) => { return state.mobileNavMenu },
    // page footer
    pageFooterHeight: (state) => { return state.pageFooterHeight },
    // admin panel
    jwt: (state) => { return state.jwt }
}
