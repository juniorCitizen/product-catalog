export function turnOnUserDataValidation(state) {
    state.validatingUserData = true
}

export function turnOffUserDataValidation(state) {
    state.validatingUserData = false
}

export function userDataValidationToggle(state) {
    state.validatingUserData = !state.validatingUserData
}
