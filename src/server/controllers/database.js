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
    let modelFilePath = path.join(__dirname, '../models')
    let modelInitSyncList = []
    fs.readdirSync(modelFilePath) // read the models directory
        .filter((fileName) => { // prep a list of js model file name
            return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
        })
        .forEach((fileName) => { // loop through the models list
            // prepare the model name from the file
            let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
            // register models in the database controller dynamically
            db[modelName] = require(path.join(modelFilePath, fileName))(sequelize, Sequelize)
            // extract the available default records for the current model in the loop
            let defaultDbRecords = null
            if (sqliteDbConfig.resetDatabase) { // check resetDatabase flag
                // determin if a default record set are in place
                defaultDbRecords = sqliteDbConfig.defaultRecords().filter((recordset) => {
                    return recordset.modelName === modelName
                })
                if (defaultDbRecords.length > 0) {
                    // reset the data table and insert default recordsets
                    modelInitSyncList.push(db[modelName]
                        .sync({ force: true })
                        .then(() => {
                            let insertDefaultRecords = []
                            defaultDbRecords[0].records.forEach((record) => {
                                insertDefaultRecords.push(db[modelName].create(record))
                            })
                            return Promise.all(insertDefaultRecords)
                        })
                    )
                } else {
                    // RESET the data table, since there are no default records available
                    modelInitSyncList.push(db[modelName].sync({ force: true }))
                }
            } else {
                // only SYNC the data table, and disregard any default records
                modelInitSyncList.push(db[modelName].sync())
            }
        })

    return sequelize
        .authenticate() // verify database connection
        .then(() => {
            // sync the list models found in the directory
            return Promise
                .each(modelInitSyncList, (modalSyncPromise) => {
                    return modalSyncPromise
                })
        })
        .then(() => {
            // db relations and constraints are activated after default records are written
            db.Series.hasMany(db.Products, { constraints: true, foreignKey: 'seriesId', targetKey: 'id' })
            db.Products.belongsTo(db.Series, { constraints: true, foreignKey: 'seriesId', targetKey: 'id' })
            db.Products.hasMany(db.Photos, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
            db.Products.hasOne(db.Descriptions, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
            db.Photos.belongsTo(db.Products, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
            db.Descriptions.belongsTo(db.Products, { constraints: true, foreignKey: 'productId', targetKey: 'id' })
            db.Countries.hasMany(db.Registrations, { constrains: true, foreignKey: 'countryId', targetKey: 'id' })
            db.Registrations.belongsTo(db.Countries, { constraints: true, foreignKey: 'countryId', targetKey: 'id' })
            db.Countries.hasMany(db.OfficeLocations, { constrains: true, foreignKey: 'countryId', targetKey: 'id' })
            db.OfficeLocations.belongsTo(db.Countries, { constraints: true, foreignKey: 'countryId', targetKey: 'id' })
            db.OfficeLocations.hasMany(db.Users, { constrains: true, foreignKey: 'officeLocationId', targetKey: 'id' })
            db.Users.belongsTo(db.OfficeLocations, { constraints: true, foreignKey: 'officeLocationId', targetKey: 'id' })
            return Promise.resolve()
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

module.exports = db // export the database access object
