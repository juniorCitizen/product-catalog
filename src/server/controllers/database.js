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

const modelsPath = path.join(__dirname, '../models')

function initialize() {
    return sequelize
        .authenticate() // verify database connection
        .then(() => {
            fs.readdirSync(modelsPath)
                .filter((fileName) => {
                    return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
                })
                .forEach((fileName) => {
                    let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
                    db[modelName] = require(path.join(modelsPath, fileName))(sequelize, Sequelize)
                    if (sqliteDbConfig.resetDatabase) {
                        db[modelName].sync({ force: true })
                    } else {
                        db[modelName].sync()
                    }
                })
            return Promise.resolve()
        })
        .then(() => {
            // db relations and constraints are activated after default records are written
            db.Series.hasMany(db.Products, {
                constraints: true,
                foreignKey: 'seriesId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Products.belongsTo(db.Series, {
                constraints: true,
                foreignKey: 'seriesId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Products.hasOne(db.Descriptions, {
                constraints: true,
                foreignKey: 'productId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Products.hasMany(db.Photos, {
                constraints: true,
                foreignKey: 'productId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Products.belongsToMany(db.Registrations, {
                as: 'ProductInquiries',
                through: db.InterestedProducts,
                constrains: true,
                foreignKey: 'registrationId',
                otherKey: 'registrationId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Photos.belongsTo(db.Products, {
                constraints: true,
                foreignKey: 'productId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Descriptions.belongsTo(db.Products, {
                constraints: true,
                foreignKey: 'productId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Countries.hasMany(db.Registrations, {
                constrains: true,
                foreignKey: 'countryId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Countries.hasMany(db.OfficeLocations, {
                constrains: true,
                foreignKey: 'countryId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Registrations.belongsTo(db.Countries, {
                constraints: true,
                foreignKey: 'countryId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Registrations.belongsToMany(db.Products, {
                as: 'PotentialClients',
                through: db.InterestedProducts,
                constrains: true,
                foreignKey: 'productId',
                otherKey: 'productId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.OfficeLocations.belongsTo(db.Countries, {
                constraints: true,
                foreignKey: 'countryId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.OfficeLocations.hasMany(db.Users, {
                constrains: true,
                foreignKey: 'officeLocationId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            db.Users.belongsTo(db.OfficeLocations, {
                constraints: true,
                foreignKey: 'officeLocationId',
                targetKey: 'id',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            })
            return Promise.resolve()
        })
        .then(() => {
            fs.readdirSync(modelsPath)
                .filter((fileName) => {
                    return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
                })
                .forEach((fileName) => {
                    let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
                    db[modelName].sync()
                })
            return Promise.resolve()
        })
        .then(() => {
            if (sqliteDbConfig.resetDatabase) {
                let insertQueries = []
                fs.readdirSync(modelsPath)
                    .filter((fileName) => {
                        return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
                    })
                    .forEach((fileName) => {
                        let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
                        let defaultDbRecords = null
                        defaultDbRecords = sqliteDbConfig.defaultRecords().filter((recordset) => {
                            return recordset.modelName === modelName
                        })
                        if (defaultDbRecords.length > 0) {
                            defaultDbRecords[0].records.forEach((record) => {
                                insertQueries.push(db[modelName].create(record))
                            })
                        }
                    })
                return Promise
                    .all(insertQueries)
                    .then(() => {
                        return Promise.resolve()
                    })
            } else {
                return Promise.resolve()
            }
        })
        .catch((error) => {
            console.log(error.name)
            console.log(error.message)
            console.log(error.stack)
            return Promise.reject(error)
        })
}

module.exports = db // export the database access object
