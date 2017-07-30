export function fieldEvalState(state) {
    let inEvalState = state.validatingUserData
    let company = state.userData.company
    let name = state.userData.name
    let email = state.userData.email
    let country = state.userData.country
    return {
        companyIsBlank: inEvalState && !company,
        nameIsBlank: inEvalState && !name,
        emailIsBlank: inEvalState && !email,
        emailIsInvalid: inEvalState && !blankOrValidEmail(email),
        countryUnselected: inEvalState && (country === 'Country')
    }
}

export function readyToRegister(state) {
    let company = state.userData.company
    let name = state.userData.name
    let email = state.userData.email
    let country = state.userData.country
    return company &&
        name &&
        email &&
        blankOrValidEmail(email) &&
        (country !== 'Country')
}

function blankOrValidEmail(emailString) {
    return (
        (!emailString) ||
        (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(emailString))
    )
}

export function regCompletionFlag(state) {
    return state.userData.id !== null
}
