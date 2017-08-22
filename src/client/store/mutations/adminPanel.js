import { decode } from 'jsonwebtoken'

// admin
export function logout(state) {
    state.jwt = null
    state.email = null
    state.loginId = null
    sessionStorage.removeItem('jwt')
}

export function restoreToken(state) {
    state.jwt = sessionStorage.jwt || null
    state.email = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.email : null
    state.loginId = sessionStorage.jwt ? decode(sessionStorage.jwt, { complete: true }).payload.loginId : null
}

export function registerToken(state, token) {
    sessionStorage.removeItem('jwt')
    sessionStorage.jwt = token
    state.email = decode(token, { complete: true }).payload.email
    state.loginId = decode(token, { complete: true }).payload.loginId
}
