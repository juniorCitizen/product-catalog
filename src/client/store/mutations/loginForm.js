export default {
    registerNewToken: registerNewToken
}

function registerNewToken(state, token) {
    if (sessionStorage.jwt) {
        sessionStorage.removeItem('jwt')
    }
    sessionStorage.jwt = token
    state.adminUser.jwt = token
}
