// load npm packages
import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'
import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

// load custom modules
import eVars from './config/environment'

// initialize Express framework and setup
console.log(chalk.red('instantiate Express Framework...'))
const app = express()

// Handlebars template engine setup
console.log(chalk.red('setup Handlebars templating engine...'))
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
console.log(chalk.red('loading global middlewares...'))
app.use(cors()) // allowing cross origin requests
app.use(require('serve-favicon')('./dist/server/client/assets/favicon.ico'))
if (eVars.NODE_ENV !== 'production') { app.use(require('morgan')('dev')) } // for debugging
app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded
app.use(bodyParser.json()) // application/json

// setup routing
const clientAccessRouter = express.Router()
app.use(`/${eVars.SYS_REF}`, clientAccessRouter)

// declaration of routing and endpoint handlers
console.log(chalk.red('setup routing and end-point handlers...'))

clientAccessRouter.use('/', require('./routes/clientAccess')) // serve index.html from hbs template engin

app.use('*', require('./routes/clientAccess')) // serve index.html from hbs template engin for any mismatched route requests

app.listen(eVars.PORT, (error) => {
    if (error) {
        console.log(chalk.red(`${eVars.SYS_REF} server could not be started...`))
        console.log(chalk.red(error))
    } else {
        console.log(chalk.red(`${eVars.SYS_REF} server activated (${eVars.REMOTE_DEV_HOST}:${eVars.PORT})`))
    }
})
