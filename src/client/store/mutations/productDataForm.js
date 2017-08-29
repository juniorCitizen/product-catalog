export default {
    register: (state, fieldValues) => {
        Object.keys(fieldValues).forEach((field) => {
            if (field === 'seriesId') {
                state.seriesId = parseInt(fieldValues[field])
            } else {
                state[field] = fieldValues[field]
            }
        })
    },
    resetStore: (state) => {
        state.seriesId = 0
        state.type = 'unselected'
        state.code = ''
        state.name = ''
        state.description = ''
        state.primaryPhoto = null
        state.secondaryPhotos = null
        state.reset = false
        state.validate = false
    },
    toggle: (state, switchProperty) => {
        state[switchProperty] = !state[switchProperty]
    },
    // other state mutations
    ignoreSecondaryPhoto: (state, photoIndex) => {
        state.secondaryPhotos[photoIndex].ignored = true
    },
    includeSecondaryPhoto: (state, photoIndex) => {
        delete state.secondaryPhotos[photoIndex].ignored
    }
}
