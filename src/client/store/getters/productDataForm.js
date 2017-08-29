export default {
    // field input values
    seriesId: state => state.seriesId,
    type: state => state.type,
    code: state => state.code,
    name: state => state.name,
    description: state => state.description,
    primaryPhoto: state => state.primaryPhoto,
    secondaryPhotos: state => state.secondaryPhotos,
    // switches
    reset: state => state.reset,
    validate: state => state.validate,
    // field validation
    fieldValidated: (state, getters) => (field) => {
        let validations = {
            seriesId: parseInt(state.seriesId) !== 0,
            type: state.type !== 'unselected',
            code: state.code !== '',
            name: state.name !== '',
            description: state.description !== '',
            primaryPhoto: state.primaryPhoto !== null,
            secondaryPhotos: state.secondaryPhotos !== null
        }
        return (field) => {
            return validations[field]
        }
    },
    formValidated: state => (
        (parseInt(state.seriesId) !== 0) &&
        (state.type !== 'unselected') &&
        (state.code !== '') &&
        (state.name !== '') &&
        (state.description !== '') &&
        (state.primaryPhoto !== null) &&
        (state.secondaryPhotos !== null)
    ),
    // other state getters
    includedSecondaryPhotoCount: (state) => {
        let secondaryPhotos = state.secondaryPhotos
        if (secondaryPhotos === null) {
            return null
        } else {
            let includedPhotoCount = 0
            for (let counter = 0; counter < secondaryPhotos.length; counter++) {
                if (secondaryPhotos[counter].ignored === undefined) {
                    includedPhotoCount++
                }
            }
            return includedPhotoCount
        }
    }
}
