import chalk from 'chalk'
import routerResponse from '../../utilities/routerResponse'

// last resort middleware error handling function
module.exports = (error, request, response, next) => {
    console.log(chalk.bold.red('CAUGHT BY LAST RESORT'))
    return routerResponse.json({
        pendingResponse: response,
        originalRequest: request,
        statusCode: 500,
        success: false,
        error: error,
        message: 'this request was handled by the last resort'
    })
}
