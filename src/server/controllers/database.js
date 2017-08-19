// exports the following
// 1. exports sequelize object
// 2. global database tables access object
// 3. database init function

import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import Sequelize from 'sequelize' // requires the sequalize library

import sqliteDbConfig from '../config/sqliteDb'

const sequelize = new Sequelize(sqliteDbConfig)

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    initialize: initialize // project model initialization function
}

function initialize() {
    // loading models from files
    let modelPath = path.resolve('./dist/server/models')
    let modelFiles = null
    let modelSyncList = []
    modelFiles = fs.readdirSync(modelPath) // read the models directory
        .filter((fileName) => { // prep a list of js model file name
            return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
        })
    modelFiles.forEach((fileName) => { // loop through the models list
        // prepare the model name from the file
        let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
        // register models in the database controller dynamically
        db[modelName] = require(path.join(modelPath, fileName))(sequelize, Sequelize)
        // check if it's a development run
        let initDbRecordset = []
        if (sqliteDbConfig.resetDatabase) { // check resetDatabase flag
            // determin if a default record set are in place
            initDbRecordset = sqliteDbConfig.defaultRecords().filter((recordset) => {
                return recordset.modelName === modelName
            })
        }
        // push a model sync function into the array
        if (initDbRecordset.length === 0) {
            // only sync data table (database will be reset if 'development' mode is detected)
            modelSyncList.push(
                db[modelName]
                    .sync({ force: sqliteDbConfig.resetDatabase })
            )
        } else {
            // sync data table and insert default recordsets
            modelSyncList.push(
                db[modelName]
                    .sync({ force: sqliteDbConfig.resetDatabase })
                    .then(() => {
                        let createArray = []
                        initDbRecordset[0].records.forEach((record) => {
                            createArray.push(db[modelName].create(record))
                        })
                        return Promise.all(createArray)
                    })
            )
        }
    })

    db.Series.hasMany(db.Products, { constraints: true, foreignKey: 'seriesId', targetKey: 'id' })
    db.Products.belongsTo(db.Series, { constraints: true, foreignKey: 'seriesId', targetKey: 'id' })
    db.Products.hasMany(db.Photos, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
    db.Photos.belongsTo(db.Products, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
    db.Products.hasOne(db.Descriptions, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
    db.Descriptions.belongsTo(db.Products, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
    db.Countries.hasMany(db.Registrations, { constrains: true, foreignKey: 'countryId', targetKey: 'alpha3Code' })
    db.Registrations.belongsTo(db.Countries, { constraints: true, foreignKey: 'countryId', targetKey: 'alpha3Code' })

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
