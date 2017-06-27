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
    return [{
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
            reference: 'Bathroom safety',
            displaySequence: 7
        }, {
            reference: 'Patient Aid / Medical Equipment',
            displaySequence: 8
        }, {
            reference: 'Aluminium Wheelchair Ramp',
            displaySequence: 9
        }, {
            reference: 'Rollator',
            displaySequence: 10
        }, {
            reference: 'KAYE Walker',
            displaySequence: 11
        }]
    }]
}
