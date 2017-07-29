export function regions(state) {
    return state.regions
}

export function countries(state) {
    return state.countries
}

export function filteredCountryList(state) {
    if (state.userData.region === 'All Regions') {
        return state.countries
    } else {
        let filteredList = state.countries.filter((country) => {
            return country.region === state.userData.region
        })
        filteredList.splice(0, 0, {
            alpha3Code: null,
            name: 'Country',
            region: state.userData.region,
            createdAt: null,
            updatedAt: null,
            deletedAt: null
        })
        return filteredList
    }
}
