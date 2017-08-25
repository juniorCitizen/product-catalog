import { decode } from 'jsonwebtoken'

// admin panel
export default {
    logout: logout,
    restoreToken: restoreToken
}

function logout(state) {
    state.jwt = null
    state.email = null
    state.loginId = null
    sessionStorage.removeItem('jwt')
}

function restoreToken(state) {
    state.jwt = sessionStorage.jwt || null
    state.email = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.email : null
    state.loginId = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.loginId : null
}
