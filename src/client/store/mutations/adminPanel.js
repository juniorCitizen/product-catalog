import { decode } from 'jsonwebtoken'

// admin panel
export default {
    logout: logout,
    restoreToken: restoreToken,
    prepAdminPanelMenu: prepAdminPanelMenu,
    resetAdminPanelMenu: resetAdminPanelMenu,
    injectLogout: injectLogout
}

function logout(state) {
    sessionStorage.removeItem('jwt')
    state.adminUser.jwt = null
    state.adminUser.loginId = null
    state.adminUser.email = null
}

function injectLogout(state) {
    state.adminPanelMenu[0].action = () => {
        sessionStorage.removeItem('jwt')
        state.adminUser.jwt = null
        state.adminUser.loginId = null
        state.adminUser.email = null
    }
}

function restoreToken(state) {
    state.adminUser.jwt = sessionStorage.jwt || null
    state.adminUser.email = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.email : null
    state.adminUser.loginId = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.loginId : null
}

function prepAdminPanelMenu(state) {
    state.series.forEach((seriesItem, seriesIndex) => {
        state.adminPanelMenu[1].submenu.push({
            title: seriesItem.reference,
            active: false,
            hover: false,
            submenu: [],
            data: seriesItem
        })
        if (seriesItem.products.length > 0) {
            seriesItem.products.forEach((product) => {
                state.adminPanelMenu[1].submenu[seriesIndex].submenu.push({
                    title: product.code,
                    active: false,
                    hover: false,
                    submenu: [],
                    data: product
                })
            })
        }
    })
}

function resetAdminPanelMenu(state) {
    state.adminPanelMenu = [{
        title: '登出',
        active: false,
        hover: false,
        submenu: [],
        data: null,
        action: null
    }, {
        title: '產品系列',
        active: false,
        hover: false,
        submenu: [],
        data: null,
        action: null
    }]
}
