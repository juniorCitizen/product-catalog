import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

import loginForm from './loginForm'

const apiUrlPrefix = `${eVars.NODE_ENV === 'production' ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}/api`

export default {
    // utility functions
    appInit: appInit,
    // api resources
    fetchRegions: fetchRegions,
    fetchCountries: fetchCountries,
    fetchOfficeLocations: fetchOfficeLocations,
    fetchSeries: fetchSeries,
    fetchProducts: fetchProducts,
    // login form
    userLogin: loginForm.userLogin
}

// utility functions
function appInit(context) {
    const initList = [{
        dispatch: 'fetchRegions',
        commits: ['registerRegions']
    }, {
        dispatch: 'fetchCountries',
        commits: ['registerCountries']
    }, {
        dispatch: 'fetchOfficeLocations',
        commits: ['registerOfficeLocations']
    }, {
        dispatch: 'fetchSeries',
        commits: ['registerSeries']
    }, {
        dispatch: 'fetchProducts',
        commits: [
            'registerProducts',
            'resetAdminPanelMenu'
        ]
    }]
    context.commit('clearStore')
    let initProcedures = []
    initList.forEach((item, index, array) => {
        initProcedures.push({
            dispatch: context.dispatch(item.dispatch),
            commit: item.commits[0],
            furtherCommits: []
        })
        let additionalCommits = array[index].commits.slice(1, array[index].commits.length)
        if (additionalCommits.length > 0) {
            initProcedures[index].furtherCommits = additionalCommits
        }
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
                        initProcedureResult.furtherCommits.forEach((commit) => {
                            context.commit(commit)
                        })
                    })
            })
        })
        .catch((error) => {
            alert('App initialization failure...')
            console.log(error)
        })
}

// api resources
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
