import { decode } from 'jsonwebtoken'

export default {
    namespaced: true,
    state: {
        jwt: sessionStorage.jwt || null
    },
    mutations: {
        register: (state, jwt) => {
            state.jwt = jwt
            sessionStorage.jwt = jwt
        },
        reset: (state) => {
            state.jwt = sessionStorage.jwt || null
        },
        logout(state) {
            sessionStorage.removeItem('jwt')
            state.jwt = null
        }
    },
    getters: {
        jwt: state => state.jwt,
        email: (state) => {
            return state.jwt !== null ? extractPayload(state.jwt, 'email') : null
        },
        loginId: (state) => {
            return state.jwt !== null ? extractPayload(state.jwt, 'loginId') : null
        }
    },
    actions: {}
}

function extractPayload(token, propertyName) {
    return decode(token, { complete: true }).payload[propertyName]
}
