import Promise from 'bluebird'
import Vue from 'vue'

const DEFAULT_FORM_STATE = {
    seriesId: 0,
    type: 'unselected',
    code: '',
    name: '',
    description: '',
    primaryPhoto: null,
    secondaryPhotos: null
}

let validation = {
    namespaced: true,
    state: {
        state: false
    },
    mutations: {
        toggle: (state) => { state.state = !state.state },
        activate: (state) => { state.state = true },
        deactivate: (state) => { state.state = false }
    },
    getters: {
        state: state => state.state,
        input: (state, getters, rootState) => {
            return (field) => {
                return rootState.productData.form.validation[field] !== DEFAULT_FORM_STATE[field]
            }
        },
        form: (state, getters, rootState) => {
            return rootState.productData.form.seriesId !== DEFAULT_FORM_STATE.seriesId &&
                rootState.productData.form.type !== DEFAULT_FORM_STATE.type &&
                rootState.productData.form.code !== DEFAULT_FORM_STATE.code &&
                rootState.productData.form.name !== DEFAULT_FORM_STATE.name &&
                rootState.productData.form.description !== DEFAULT_FORM_STATE.description &&
                rootState.productData.form.primaryPhoto !== DEFAULT_FORM_STATE.primaryPhoto &&
                rootState.productData.form.secondaryPhotos !== DEFAULT_FORM_STATE.secondaryPhotos
        }
    }
}

let form = {
    namespaced: true,
    state: {
        seriesId: 0,
        type: 'unselected',
        code: '',
        name: '',
        description: '',
        primaryPhoto: null,
        secondaryPhotos: null,
        ignoredPhotos: []
    },
    mutations: {
        register: (state, payload) => {
            state[payload.name] = payload.value
            if (payload.name === 'secondaryPhotos') {
                state.ignoredPhotos = []
                if (payload.value !== null) {
                    for (let counter = 0; counter < payload.value.length; counter++) {
                        state.ignoredPhotos.push(false)
                    }
                }
            }
        },
        ignore: (state, photoIndex) => {
            Vue.set(state.ignoredPhotos, photoIndex, true)
        },
        include: (state, photoIndex) => {
            Vue.set(state.ignoredPhotos, photoIndex, false)
        },
        reset: (state) => {
            state.validation.state = false
            state.seriesId = 0
            state.type = 'unselected'
            state.code = ''
            state.name = ''
            state.description = ''
            state.primaryPhoto = null
            state.secondaryPhotos = null
            state.ignoredPhotos = []
        }
    },
    getters: {
        seriesId: state => state.seriesId,
        type: state => state.type,
        code: state => state.code,
        name: state => state.name,
        description: state => state.description,
        primaryPhoto: state => state.primaryPhoto,
        secondaryPhotos: state => state.secondaryPhotos,
        ignoredPhotos: state => state.ignoredPhotos,
        includedCount: (state) => {
            return state.ignoredPhotos.filter((ignoredPhoto) => {
                return ignoredPhoto === false
            }).length
        },
        formData: (state, getters) => {
            if (!getters['validation/form']) {
                return false
            } else {
                let formData = new FormData()
                formData.append('primaryPhoto', state.primaryPhoto[0])
                for (let counter = 0; counter < state.secondaryPhotos.length; counter++) {
                    formData.append('secondaryPhotos', state.secondaryPhotos[counter])
                }
                formData.append('seriesId', state.seriesId)
                formData.append('type', state.type)
                formData.append('code', state.code)
                formData.append('name', state.name)
                formData.append('text', state.description)
                return formData
            }
        }
    },
    actions: {
        register: (context, payload) => {
            if ((payload.name === 'primaryPhoto') && (payload.value.length !== 1)) {
                let error = new Error('primary photo count must be equal to 1')
                error.name = 'primaryPhotoCountCountraint'
                return Promise.reject(error)
            } else if ((payload.name === 'secondaryPhotos') && (payload.value.length < 2) && (payload.value.length > 15)) {
                let error = new Error('secondary photo count must be at least 2 or less then or equal to 15')
                error.name = 'secondaryPhotoCountCountraint'
                return Promise.reject(error)
            } else {
                context.commit('register', payload)
                return Promise.resolve()
            }
        }
    },
    modules: {
        validation: validation
    }
}

export default {
    namespaced: true,
    state: {
        newEntry: true,
        updateProductId: null
    },
    mutations: {
        newEntry: (state) => { state.newEntry = true },
        updateRecord: (state, productData) => {
            state.form.validation.state = false
            state.newEntry = false
            state.form.ignoredPhotos = []
            state.form.seriesId = productData.seriesId
            state.form.type = productData.type
            state.form.code = productData.code
            state.form.name = productData.name
            state.form.description = productData.description.text
            state.form.primaryPhoto = productData.photos.slice(0, 1)
            state.form.secondaryPhotos = productData.photos.slice(1, productData.photos.length)
            state.updateProductId = productData.id
        },
        reset: (state) => {
            state.form.validation.state = false
            state.form.seriesId = 0
            state.form.type = 'unselected'
            state.form.code = ''
            state.form.name = ''
            state.form.description = ''
            state.form.primaryPhoto = null
            state.form.secondaryPhotos = null
            state.form.ignoredPhotos = []
            state.newEntry = true
            state.updateProductId = null
        }
    },
    getters: {
        newEntry: state => state.newEntry,
        updateProductId: state => state.updateProductId
    },
    actions: {},
    modules: {
        form: form
    }
}
