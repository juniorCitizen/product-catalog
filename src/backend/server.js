// load npm packages
import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'
import express from 'express'
import exphbs from 'express-handlebars'
import morgan from 'morgan'
import path from 'path'

// load custom modules
import eVars from './config/environment'

// setup Express framework and routing
console.log(chalk.bold.blue('loading Express framework...'))
export let serverStartTime = null // log server start time
const app = express() // init express app

// Handlebars template engine setup
console.log(chalk.bold.blue('setup Handlebars templating engine...'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))
app.set('layouts', path.join(__dirname, '/views/layouts'))
app.set('partials', path.join(__dirname, '/views/partials'))

// global routing and middlewares
console.log(chalk.bold.blue('loading global middlewares...'))
const main = express.Router() // create an express router
app.use(`/${eVars.SYS_REF}`, main) // adds system reference name to the endpoint paths globally
main.use(cors()) // allowing cross origin requests
main.use(morgan('dev')) // for debugging
main.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded
main.use(bodyParser.json()) // application/json

// custom request preprocessing middlewares
console.log(chalk.bold.blue('loading custom pre-processing middleware...'))
main.use(require('./middlewares/preprocessing/preset404.js')) // preset all requests as status 404
main.use(require('./middlewares/preprocessing/unsupportedMethods.js')) // catch request using unsupported methods

// declaration of routing and endpoint handlers
console.log(chalk.bold.blue('setup routing and end-point handlers...'))
main.use('/', require('./routes/serverStatus.js')) // serves server status template
main.use('/', require('./routes/clientFiles.js')) // serve static client files

// custom request postprocessing middlewares
console.log(chalk.bold.blue('loading custom post-processing middleware...'))
main.use(require('./middlewares/postprocessing/fallThrough.js')) // catch requests that falls through all avail handlers
main.use(require('./middlewares/postprocessing/lastResort.js')) // last resort

// // initializing system different system components
// let initProcedures = []
// // prepare a list of initialization procedures
// initProcedures.push(db.initialize()) // initialize database.js module and data models
// initProcedures.push(telegram.initialize()) // initialize a telegram bot for broadcasting
// initProcedures.push(telegram.polling()) // start Bot polling mechanism
// initProcedures.push(telegram.observeCommands(botCommands)) // load bot commands
// initProcedures.push(telegram.observeEvents(botEvents)) // load bot events
// initProcedures.push(broadcastSystem.initialize()) // start broadcasting
// // init each system sequentially
// Promise.each(initProcedures, (initProcedurePromise) => {
//     return initProcedurePromise
// }).then((initProcedureResults) => {
//     // display init messages sequentially
//     initProcedureResults.forEach((initProcedureResult) => {
//         console.log(initProcedureResult.message)
//     })
// start node express server
app.listen(eVars.PORT, (error) => {
    serverStartTime = new Date()
    if (error) {
        console.log(`${eVars.SYS_REF} server could not be started...`)
        console.log(error)
    } else {
        console.log(`${eVars.SYS_REF} server activated (${eVars.HOST}:${eVars.PORT})...`)
    }
})
// }).catch((error) => {
//     console.log(JSON.stringify(error, null, '  '))
// })
