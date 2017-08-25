export default {
    emailReady: emailReady,
    loginIdReady: loginIdReady,
    passwordReady: passwordReady,
    readyToSubmit: (state) => {
        return emailReady(state) && loginIdReady(state) && passwordReady(state)
    }
}

function emailReady(state) {
    return !(state.loginForm.email === '') && emailStringIsValid(state.loginForm.email)
}

function loginIdReady(state) {
    return !(state.loginForm.loginId === '')
}

function passwordReady(state) {
    return !(state.loginForm.password === '')
}

function emailStringIsValid(emailString) {
    return (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(emailString))
}
