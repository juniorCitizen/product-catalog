// exports the following
// 1. exports sequelize object
// 2. global database tables access object
// 3. database init function

import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize' // requires the sequalize library

import config from '../config/database'
import eVars from '../config/environment'

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
    let modelPath = path.resolve('./src/server/models')
    let modelSyncList = []
    fs.readdirSync(modelPath) // retrieves the file list from models directory
        .filter((fileName) => { // returns js models file list
            return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
        }).forEach((fileName) => { // loop through the models list
            // prepare the model name from the file
            let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
            // register models dynamically
            db[modelName] = require(path.join(path.resolve('./src/server/models'), fileName))(sequelize, Sequelize)
            // check if it's a development run
            let initDbRecordset = null
            if (eVars.NODE_ENV === 'development') {
                // determin if a default record set are in place
                initDbRecordset = config.defaultRecords.filter((recordset) => {
                    return recordset.modelName === modelName
                })
            }
            // push a model sync function into the array
            if (initDbRecordset.length === 0) {
                // only sync data table (reset db if in development mode)
                modelSyncList.push(db[modelName].sync({ force: config.resetDatabase }))
            } else {
                // sync data table and insert default recordsets
                modelSyncList.push(db[modelName]
                    .sync({ force: config.resetDatabase })
                    .then(() => {
                        let createArray = []
                        initDbRecordset[0].records.forEach((record) => {
                            createArray.push(
                                db[modelName].create(record)
                            )
                        })
                        return Promise.all(createArray)
                    })
                )
            }
        })

    db.Series.hasMany(db.Products, { constraints: true })
    db.Products.hasMany(db.Photos, { constraints: true })
    db.Products.hasOne(db.Descriptions, { constraints: true })
    db.Descriptions.belongsTo(db.Products, { constraints: true, sourceKey: 'productId', targetKey: 'id' })
    db.Photos.belongsTo(db.Products, { constraints: true, sourceKey: 'productId', targetKey: 'id' })

    return sequelize
        .authenticate() // verify database connection
        .then(() => {
            // sync the list models found in the directory
            return Promise.each(modelSyncList, (modalSyncPromise) => {
                return modalSyncPromise
            })
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

module.exports = db // export the database access object
