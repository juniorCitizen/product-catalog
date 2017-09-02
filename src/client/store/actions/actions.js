import axios from 'axios'
import Promise from 'bluebird'

import eVars from '../../../server/config/environment'

export default {
    reset: (context) => {
        context.commit('viewport/reset')
        context.commit('mobileNavMenu/deactivate')
        context.commit('regions/reset')
        context.commit('countries/reset')
        context.commit('officeLocations/reset')
        context.commit('series/reset')
        context.commit('products/reset')
        context.commit('loginForm/reset')
        context.commit('flowControl/stop')
        context.commit('credentials/reset')
    },
    initialize: (context) => {
        context.dispatch('reset')
        const apiDataNodes = [{
            dispatch: 'regions/fetch',
            commits: ['regions/register']
        }, {
            dispatch: 'countries/fetch',
            commits: ['countries/register']
        }, {
            dispatch: 'officeLocations/fetch',
            commits: ['officeLocations/register']
        }, {
            dispatch: 'series/fetch',
            commits: ['series/register']
        }, {
            dispatch: 'products/fetch',
            commits: ['products/register']
        }]
        let initProcedures = []
        apiDataNodes.forEach((apiDataNode, nodeIndex, nodeArray) => {
            initProcedures.push({
                dispatch: context.dispatch(apiDataNode.dispatch),
                commit: apiDataNode.commits[0],
                additionalCommits: []
            })
            let workingNode = nodeArray[nodeIndex]
            let additionalCommits = workingNode.commits.slice(1, workingNode.commits.length)
            if (additionalCommits.length > 0) {
                initProcedures[nodeIndex].additionalCommits = additionalCommits
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
                            initProcedureResult.additionalCommits.forEach((commit) => {
                                context.commit(commit)
                            })
                        })
                })
            })
            .catch((error) => {
                console.log(error.name)
                console.log(error.message)
                console.log(error.stack)
                alert('App initialization failure...')
                window.location.assign(`${eVars.HOST}/404.html`)
            })
    },
    login: (context) => {
        context.commit('flowControl/start')
        return axios({
            method: 'post',
            url: `${eVars.API_URL}/token`,
            data: context.getters['loginForm/state']
        }).then((token) => {
            context.commit('loginForm/reset')
            context.commit('credentials/register', token.data.data.token)
            context.commit('flowControl/stop')
            return Promise.resolve()
        }).catch((error) => {
            context.commit('loginForm/register', {
                name: 'password',
                value: ''
            })
            context.commit('loginForm/validation/deactivate')
            context.commit('flowControl/stop')
            return Promise.reject(error)
        })
    }
}
