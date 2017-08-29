import { decode } from 'jsonwebtoken'

export default {
    // simple state values
    email: state => state.email,
    loginId: state => state.loginId,
    password: state => state.password,
    botPrevention: state => state.botPrevention,
    jwt: state => state.jwt,
    // switches
    reset: state => state.reset,
    validate: state => state.validate,
    // field validation
    fieldValidated: fieldValidated,
    formValidated: formValidated,
    // other state getters
    formData: formData,
    verifiedEmail: verifiedEmail,
    verifiedLoginId: verifiedLoginId,
    loggedIn: state => state.jwt !== null
}

function verifiedLoginId(state) {
    return state.jwt !== null ? extractPayload(state.jwt, 'loginId') : null
}

function verifiedEmail(state) {
    return state.jwt !== null ? extractPayload(state.jwt, 'email') : null
}

function formValidated(state) {
    return (
        (state.email !== '') &&
        emailStringIsValid(state.email) &&
        (state.loginId !== '') &&
        (state.password !== '')
    )
}

function fieldValidated(state, getters) {
    return (field) => {
        let validations = {
            email: state.email !== '' && emailStringIsValid(state.email),
            loginId: state.loginId !== '',
            password: state.password !== ''
        }
        return (field) => {
            return validations[field]
        }
    }
}

function formData(state) {
    return {
        email: state.email,
        loginId: state.loginId,
        password: state.password,
        botPrevention: state.botPrevention
    }
}

function emailStringIsValid(emailString) {
    return (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(emailString))
}

function extractPayload(token, propertyName) {
    return decode(token, { complete: true }).payload[propertyName]
}
