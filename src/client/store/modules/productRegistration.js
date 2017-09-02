let validation = {
    namespaced: true,
    state: {
        state: false
    },
    mutations: {
        toggle: (state) => { state.state = !state.state },
        start: (state) => { state.state = true },
        stop: (state) => { state.state = false }
    },
    getters: {},
    actions: {},
    modules: {}
}

const DEFAULT_FORM_STATE = {
    seriesId: 0,
    type: 'unselected',
    code: '',
    name: '',
    description: '',
    primaryPhoto: null,
    secondaryPhotos: null,
    botPrevention: ''
}

let form = {
    namespaced: true,
    state: DEFAULT_FORM_STATE,
    mutations: {
        reset: (state) => { state = DEFAULT_FORM_STATE }
    },
    getters: {},
    actions: {},
    modules: {
        validation: validation
    }
}

export default {
    namespaced: true,
    state: {},
    mutations: {
        reset: (state) => {
            state.form.validation.state.state = false
            state.form.state = DEFAULT_FORM_STATE
        }
    },
    getters: {},
    actions: {},
    modules: {
        form: form
    }
}
