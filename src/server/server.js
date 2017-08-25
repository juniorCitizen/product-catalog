// load npm packages
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import Promise from 'bluebird'

// load custom modules
import db from './controllers/database'
import emailSystem from './controllers/emails/emails'
import proxyRegistration from './controllers/proxyRegistration'
import eVars from './config/environment'

// instantiating Express Framework
console.log('instantiating Express Framework...')
const app = express()

// setup Handlebars template engine
console.log('setup Handlebars templating engine...')
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

// global middlewares
console.log('loading global middlewares...')
app.use(cors()) // allowing cross origin requests
app.use(require('serve-favicon')('./dist/server/client/assets/favicon.ico'))
if (eVars.NODE_ENV !== 'production') { app.use(require('morgan')('dev')) } // for debugging
app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded
app.use(bodyParser.json()) // application/json

// setup routing
console.log('setup routers...')
const clientAccessRouter = express.Router()
app.use('/productCatalog', clientAccessRouter)
const apiAccessRouter = express.Router()
app.use('/productCatalog/api', apiAccessRouter)

// declaration of routing and endpoint handlers
console.log('setup end-point handlers...')
clientAccessRouter.use('/', require('./routes/clientAccess')) // serve index.html from hbs template engine

// api routes
apiAccessRouter.use('/products', require('./routes/products/products'))
apiAccessRouter.use('/photos', require('./routes/photos/photos'))
apiAccessRouter.use('/countries', require('./routes/countries/countries'))
apiAccessRouter.use('/registrations', require('./routes/registrations'))
apiAccessRouter.use('/users', require('./routes/users/users'))
apiAccessRouter.use('/token', require('./routes/token/token'))

app.use('*', require('./routes/clientAccess')) // serve index.html from hbs template engin for any mismatched route requests

// initializing system components
console.log('initializing system components...')
let initProcedures = []
initProcedures.push(db.initialize()) // initialize system database
initProcedures.push(emailSystem.initialize()) // initialize email system
initProcedures.push(proxyRegistration) // register with the reverse proxy server
Promise.each(initProcedures, (initProcedurePromise) => { // initialize each system sequentially
    return initProcedurePromise
}).then((initProcedureResults) => {
    // start node express server
    console.log('spin up Node Express web server...')
    return app.listen(eVars.PORT, (error) => {
        if (error) {
            console.log(`${eVars.SYS_REF} server could not be started...`)
            console.log(error)
            return Promise.reject(error)
        } else {
            console.log(`${eVars.SYS_REF} server activated (${eVars.REMOTE_DEV_HOST}:${eVars.PORT})`)
            return Promise.resolve
        }
    })
}).catch((error) => {
    console.log(error)
})
