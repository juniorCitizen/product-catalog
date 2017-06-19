import chalk from 'chalk'
import path from 'path'

import eVars from './environment.js'

module.exports = { // connection object for sqlite database
    dialect: 'sqlite',
    storage: path.join('./', `${eVars.SYS_REF}.db`), // path to database file
    // timezone: eVars.TIMEZONE, // unsupported by SQLite
    // control if database operations are output with verbose messages
    logging: eVars.ENV === 'development' ? chalkedMessage : false,
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
    resetDatabase: eVars.ENV !== 'production'
}

function chalkedMessage(textString) {
    console.log(chalk.green(textString))
}
