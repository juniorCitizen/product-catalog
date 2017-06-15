import chalk from 'chalk'

import eVars from '../../config/environment'
import routerResponse from '../../utilities/routerResponse'

// middleware functions to deal with reqeusts that falls through all available handlers
module.exports = (request, response, next) => {
    console.log(chalk.bold.red('CAUGHT BY FELL TRHOUGH'))
    console.log(chalk.bold.red('======================'))
    console.log(chalk.bold.red(request.originalUrl))
    console.log(chalk.bold.red('======================'))
    // serve the index.hbs for any request that results in 404 errors in order to work with Vue.js's router history mode
    return routerResponse.template({
        pendingResponse: response,
        statusCode: 200,
        reference: 'index.hbs',
        data: {
            title: 'Gentry-Way Product Catalog',
            host: eVars.HOST,
            port: eVars.PORT,
            sysRef: eVars.SYS_REF
        }
    })
    // if (response.statusCode === 404) {
    // return routerResponse.json({
    //     pendingResponse: response,
    //     originalRequest: request,
    //     statusCode: response.statusCode,
    //     success: false,
    //     message: 'the request was not handled'
    // })
    // } else {
    // next('the request was not handled')
    // }
}
