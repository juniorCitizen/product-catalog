import chalk from 'chalk'
import path from 'path'

import eVars from './environment.js'

module.exports = { // connection object for sqlite database
    dialect: 'sqlite',
    storage: path.join('./', `${eVars.SYS_REF}.db`), // path to database file
    // timezone: eVars.TIMEZONE, // unsupported by SQLite
    // control if database operations are output with verbose messages
    logging: eVars.NODE_ENV === 'development' ? chalkedMessage : false,
    define: {
        underscored: false,
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    },
    // custom settings
    resetDatabase: false, // eVars.NODE_ENV !== 'production',
    defaultRecords: defaultRecords()
}

function chalkedMessage(textString) {
    console.log(chalk.green(textString))
}

function defaultRecords() {
    const countries = require('world-countries/dist/countries.json')
    const defaultRecords = [{
        modelName: 'Series',
        records: [{
            reference: 'Crutch',
            displaySequence: 0
        }, {
            reference: 'Cane',
            displaySequence: 1
        }, {
            reference: 'Forearm Crutch',
            displaySequence: 2
        }, {
            reference: 'Quad Cane',
            displaySequence: 3
        }, {
            reference: 'Bath Bench',
            displaySequence: 4
        }, {
            reference: 'Aluminium Walker',
            displaySequence: 5
        }, {
            reference: 'Commode Chair',
            displaySequence: 6
        }, {
            reference: 'Bathroom Safety',
            displaySequence: 7
        }, {
            reference: 'Patient Aid',
            displaySequence: 8
        }, {
            reference: 'Rollator',
            displaySequence: 9
        }, {
            reference: 'Accessory',
            displaySequence: 10
        }]
    }, {
        modelName: 'Countries',
        records: []
    }]
    countries.forEach((country) => {
        defaultRecords[1].records.push({
            alpha3Code: country.cca3,
            name: country.name.common,
            region: country.region === '' ? 'Other' : country.region
        })
    })
    return defaultRecords
}
