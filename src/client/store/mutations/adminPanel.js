export default {
    // simple store mutations
    registerEmail: (state, email) => { state.email = email },
    registerLoginId: (state, loginId) => { state.loginId = loginId },
    registerPassword: (state, password) => { state.password = password },
    registerBotPrevention: (state, botPrevention) => { state.botPrevention = botPrevention },
    registerJwt: (state, jwt) => {
        state.jwt = jwt
        sessionStorage.jwt = jwt
    },
    // switch mutations
    toggleValidate: (state) => { state.validate = !state.validate },
    resetForm: (state) => {
        state.validate = false
        state.email = ''
        state.loginId = ''
        state.password = ''
        state.botPrevention = ''
    },
    resetStore: (state) => {
        state.validate = false
        state.email = ''
        state.loginId = ''
        state.password = ''
        state.botPrevention = ''
        state.reset = false
        state.validate = false
        state.jwt = sessionStorage.jwt || null
    },
    // other state mutations
    restoreToken(state) {
        state.jwt = sessionStorage.jwt || null
    },
    logout(state) {
        sessionStorage.removeItem('jwt')
        state.jwt = null
    }
}
