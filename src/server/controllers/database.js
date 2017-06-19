// exports the following
// 1. exports sequelize object
// 2. global database tables access object
// 3. database init function

import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize' // requires the sequalize library

import config from '../config/database'

// initialize sequelize database object
const sequelize = new Sequelize(config)

// create a global database access object
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    initialize: initialize // project model initialization function
}

function initialize() {
    // dynamically load model from models directory
    let modelPath = path.resolve('../models')
    let modelSyncList = []
    fs.readdirSync(modelPath) // retrieves the file list from models directory
        .filter((fileName) => { // returns js models file list
            return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
        }).forEach((fileName) => { // loop through the models list
            // prepare the model name from the file
            let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
            // register models dynamically
            db[modelName] = require(path.join(path.resolve('../models'), fileName))(sequelize, Sequelize)
            // push a model sync function into the array
            modelSyncList.push(db[modelName].sync({ force: config.resetDatabase }))
        })
    // sync the list models found in the directory
    return Promise.each(modelSyncList, (modalSyncPromise) => {
        return modalSyncPromise
    })
}

module.exports = db // export the database access object
