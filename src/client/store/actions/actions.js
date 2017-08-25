import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

const apiUrlPrefix = `${eVars.NODE_ENV === 'production' ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}/api`

export default {
    // utility functions
    appInit: appInit,
    // api recordsets
    fetchRegions: fetchRegions,
    fetchCountries: fetchCountries,
    fetchOfficeLocations: fetchOfficeLocations,
    fetchSeries: fetchSeries,
    fetchProducts: fetchProducts
}

// utility functions
function appInit(context) {
    const initList = [{
        dispatch: 'fetchRegions',
        commit: 'registerRegions'
    }, {
        dispatch: 'fetchCountries',
        commit: 'registerCountries'
    }, {
        dispatch: 'fetchOfficeLocations',
        commit: 'registerOfficeLocations'
    }, {
        dispatch: 'fetchSeries',
        commit: 'registerSeries'
    }, {
        dispatch: 'fetchProducts',
        commit: 'registerProducts'
    }]
    context.commit('clearStore')
    let initProcedures = []
    initList.forEach((item) => {
        initProcedures.push({
            dispatch: context.dispatch(item.dispatch),
            commit: item.commit
        })
    })
    Promise
        .each(initProcedures, (initProcedure) => {
            return initProcedure
        })
        .then((initProcedureResults) => {
            initProcedureResults.forEach((initProcedureResult) => {
                initProcedureResult
                    .dispatch
                    .then((fetchedApiData) => {
                        context.commit(initProcedureResult.commit, fetchedApiData.data.data)
                    })
            })
        })
        .catch((error) => {
            alert('App initialization failure...')
            console.log(error)
        })
}

// api recordsets
function fetchRegions(context) {
    let axiosOptions = {
        method: 'get',
        url: `${apiUrlPrefix}/countries/regions`
    }
    return axios(axiosOptions)
}

function fetchCountries(context) {
    let axiosOptions = {
        method: 'get',
        url: `${apiUrlPrefix}/countries`
    }
    return axios(axiosOptions)
}

function fetchOfficeLocations(context) {
    let axiosOptions = {
        method: 'get',
        url: `${apiUrlPrefix}/countries/officeLocations`
    }
    return axios(axiosOptions)
}

function fetchSeries(context) {
    let axiosOptions = {
        method: 'get',
        url: `${apiUrlPrefix}/products/series`
    }
    return axios(axiosOptions)
}

function fetchProducts(context) {
    let axiosOptions = {
        method: 'get',
        url: `${apiUrlPrefix}/products`
    }
    return axios(axiosOptions)
}
