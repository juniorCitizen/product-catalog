import loginForm from './loginForm'

export default {
    // routing
    routes: (state) => { return state.routes },
    // api resources
    clientAccessUrl: (state) => { return state.clientAccessUrl },
    apiUrl: (state) => { return state.apiUrl },
    officeLocations: (state) => { return state.officeLocations },
    dataSubmissionInProgress: (state) => { return state.dataSubmission.inProgress },
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
    // login form
    loginFormValidation: (state) => { return state.loginForm.validation },
    loginFormEmail: (state) => { return state.loginForm.email },
    loginFormEmailReady: (state) => { return loginForm.emailReady(state) },
    loginFormLoginId: (state) => { return state.loginForm.loginId },
    loginFormLoginIdReady: (state) => { return loginForm.loginIdReady(state) },
    loginFormPassword: (state) => { return state.loginForm.password },
    loginFormPasswordReady: (state) => { return loginForm.passwordReady(state) },
    loginFormReadyToSubmit: (state) => { return loginForm.readyToSubmit(state) },
    // admin panel
    jwt: (state) => { return state.jwt }
}
