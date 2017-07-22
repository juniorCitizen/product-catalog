// load npm packages
import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'
import exphbs from 'express-handlebars'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import Promise from 'bluebird'

// load custom modules
import eVars from './config/environment'
import db from './controllers/database'

// setup Express framework and routing
console.log(chalk.blue('loading Express framework...'))
export let serverStartTime = null // log server start time
const app = express() // init express app

// Handlebars template engine setup
console.log(chalk.blue('setup Handlebars templating engine...'))
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
console.log(chalk.blue('loading global middlewares...'))
app.use(require('serve-favicon')('dist/client/favicon/favicon.ico'))

const apiRouter = express.Router() // create an express router
app.use(`/${eVars.SYS_REF}/api`, apiRouter) // adds system reference name to the endpoint paths globally
apiRouter.use(cors()) // allowing cross origin requests
apiRouter.use(morgan('dev')) // for debugging
apiRouter.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded
apiRouter.use(bodyParser.json()) // application/json

// custom request preprocessing middlewares
// console.log(chalk.blue('loading custom pre-processing middleware...'))
// main.use(require('./middlewares/preprocessing/preset404.js')) // preset all requests as status 404
// main.use(require('./middlewares/preprocessing/unsupportedMethods.js')) // catch request using unsupported methods

// declaration of routing and endpoint handlers
console.log(chalk.blue('setup routing and end-point handlers...'))
app.use('/', express.static(path.join(__dirname, '../client'))) // serve static html

// main.use('/', require('./routes/serverStatus.js')) // serves server status template
apiRouter.use('/series', require('./routes/api/series'))
apiRouter.use('/photos', require('./routes/api/photos'))
apiRouter.use('/products', require('./routes/api/products/products'))
apiRouter.use('/users', require('./routes/api/users'))

// custom request postprocessing middlewares
// console.log(chalk.blue('loading custom post-processing middleware...'))
// app.use(require('./middlewares/postprocessing/fallThrough.js')) // catch requests that falls through all avail handlers
// app.use(require('./middlewares/postprocessing/lastResort.js')) // last resort

// serve index.html on requests to missing routes on the root level
app.use('*', express.static(path.join(__dirname, '../client')))

// initializing system different system components
let initProcedures = []
// prepare a list of initialization procedures
initProcedures.push(db.initialize()) // initialize database.js module and data models
// initialize each system sequentially
Promise.each(initProcedures, (initProcedurePromise) => {
    return initProcedurePromise
}).then((initProcedureResults) => {
    // start node express server
    app.listen(eVars.PORT, (error) => {
        // serverStartTime = new Date()
        if (error) {
            console.log(`${eVars.SYS_REF} server could not be started...`)
            console.log(error)
        } else {
            console.log(`${eVars.SYS_REF} server activated (${eVars.HOST}:${eVars.PORT})...`)
        }
    })
}).catch((error) => {
    console.log(chalk.red(error))
})
