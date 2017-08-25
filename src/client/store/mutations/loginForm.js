import { decode } from 'jsonwebtoken'

// admin panel
export default {
    registerToken: registerToken
}

function registerToken(state, token) {
    sessionStorage.removeItem('jwt')
    sessionStorage.jwt = token
    state.email = decode(token, { complete: true }).payload.email
    state.loginId = decode(token, { complete: true }).payload.loginId
}
