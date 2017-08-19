import routes from '../../routes'

export default {
    // utility functions
    clearStore: clearStore,
    // api recordsets
    registerCompanyStaffMembers: registerCompanyStaffMembers
}

// utility functions
function clearStore(state) {
    // routing
    state.routes = routes
    state.companyStaffMembers = []
}

// api recordsets
function registerCompanyStaffMembers(state, data) {
    state.companyStaffMembers = data
}
