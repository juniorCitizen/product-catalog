export default {
    // input field values
    email: '',
    loginId: '',
    password: '',
    botPrevention: '',
    // switches
    reset: false,
    validate: false,
    // other states
    jwt: sessionStorage.jwt || null
}
