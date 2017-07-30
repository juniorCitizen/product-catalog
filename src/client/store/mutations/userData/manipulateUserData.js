export function markRegisteredSession(state, payload) { // pending deprecation
    state.validatingUserData = false
    state.userData = {
        id: payload.registrationId,
        company: payload.company,
        name: payload.name,
        email: payload.email,
        country: payload.country,
        comments: payload.comments
    }
    state.alreadyRegistered = true // pending deprecation
    // state.resettingUserData = false // pending deprecation
    state.registeredUserInfo = { // pending deprecation
        registrationId: payload.registrationId,
        company: payload.company,
        name: payload.name,
        email: payload.email,
        country: payload.country,
        comments: payload.comments
    }
}

export function updateUserData(state, payload) {
    for (let attribute in payload) {
        state.userData[attribute] = payload[attribute]
    }
    // pending deprecation ///////////////////////
    for (let attribute in payload) {
        state.registeredUserInfo[attribute] = payload[attribute]
    }
}

export function resetUserData(state) {
    state.validatingUserData = false
    state.userData = {
        id: null,
        company: '',
        name: '',
        email: '',
        region: 'All Regions',
        country: 'Country',
        comments: '',
        botPrevention: ''
    }
    state.alreadyRegistered = false // pending deprecation
    // state.resettingUserData = false // pending deprecation
    state.registeredUserInfo = { // pending deprecation
        registrationId: null,
        validation: false,
        company: '',
        name: '',
        email: '',
        country: 'Country',
        comments: ''
    }
}
