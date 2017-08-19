import routes from '../../routes'

export default {
    // utility
    resetStore: resetStore
    // routing
}

function resetStore(state) {
    // routing
    state.routes = routes
}
