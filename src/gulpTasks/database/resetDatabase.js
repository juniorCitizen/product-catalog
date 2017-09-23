import fs from 'fs-extra'
import path from 'path'
import Promise from 'bluebird'
import Sequelize from 'sequelize'

import eVars from '../../server/config/environment'

module.exports = (gulp, plugins) => {
    let blankDbPath = path.join(__dirname, `${eVars.SYS_REF}.blank.db`)
    let workingDbName = `${eVars.SYS_REF}.fresh.db`
    let workingDbPath = path.join(__dirname, workingDbName)
    let modelsPath = path.join(__dirname, '../../server/models')
    let databaseConfig = {
        dialect: 'sqlite',
        storage: workingDbPath,
        // logging: (textString) => { console.log(require('chalk').red(textString)) },
        logging: false,
        define: {
            underscored: false,
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt'
        }
    }
    let sequelize = new Sequelize(databaseConfig)
    let db = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }
    let defaultRecordsetPath = path.join(__dirname, 'defaultRecordsets')

    return (done) => {
        fs.remove(workingDbPath)
            .then(() => {
                return fs.copy(blankDbPath, workingDbPath)
            })
            .then(() => {
                return sequelize.authenticate()
            })
            .then(() => {
                return fs.readdir(modelsPath)
            })
            .then((dirContents) => {
                let modelSyncOperations = []
                dirContents
                    .filter((fileName) => {
                        return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
                    })
                    .forEach((fileName) => {
                        let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
                        db[modelName] = require(path.join(modelsPath, fileName))(sequelize, Sequelize)
                        modelSyncOperations.push(db[modelName].sync({ force: true }))
                    })
                return Promise.all(modelSyncOperations)
            })
            .then(() => {
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
                    through: db.InterestedProducts,
                    constrains: true,
                    foreignKey: 'productId',
                    // otherKey: 'registrationId',
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
                    through: db.InterestedProducts,
                    constrains: true,
                    foreignKey: 'registrationId',
                    // otherKey: 'productId',
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
                return fs.readdir(modelsPath)
            })
            .then((dirContents) => {
                let modelSyncOperations = []
                dirContents
                    .filter((fileName) => {
                        return ((fileName.indexOf('.') !== 0) && (fileName.slice(-3) === '.js'))
                    })
                    .forEach((fileName) => {
                        let modelName = fileName.slice(0, -3).charAt(0).toUpperCase() + fileName.slice(0, -3).slice(1)
                        modelSyncOperations.push(db[modelName].sync({ force: true }))
                    })
                return Promise.all(modelSyncOperations)
            })
            .then(() => {
                let insertQueries = []
                require(path.join(defaultRecordsetPath, 'countries')).forEach((countryRecord) => {
                    insertQueries.push(db.Countries.create(countryRecord))
                })
                return Promise.all(insertQueries)
            })
            .then(() => {
                let insertQueries = []
                require(path.join(defaultRecordsetPath, 'officeLocations')).forEach((officeLocationRecord) => {
                    insertQueries.push(db.OfficeLocations.create(officeLocationRecord))
                })
                return Promise.all(insertQueries)
            })
            .then(() => {
                let insertQueries = []
                require(path.join(defaultRecordsetPath, 'users')).forEach((userRecord) => {
                    insertQueries.push(db.Users.create(userRecord))
                })
                return Promise.all(insertQueries)
            })
            .then(() => {
                let insertQueries = []
                require(path.join(defaultRecordsetPath, 'series')).forEach((seriesRecord) => {
                    insertQueries.push(db.Series.create(seriesRecord))
                })
                return Promise.all(insertQueries)
            })
            .then(() => {
                let insertQueries = []
                require(path.join(defaultRecordsetPath, 'mockProducts'))
                    .forEach((productRecord) => {
                        insertQueries.push(db.Products
                            .create(productRecord)
                            .then((newProduct) => {
                                return db.Descriptions.create({
                                    productId: newProduct.id,
                                    text: require('random-paragraph')({
                                        min: 3,
                                        max: 7
                                    })
                                })
                            })
                            .then((newDescription) => {
                                let mockPhotoPath = path.join(defaultRecordsetPath, 'mockPhotos')
                                return fs
                                    .readdir(mockPhotoPath)
                                    .then((files) => {
                                        let imageCount = files.length
                                        let imageIndexArray = [Math.floor(Math.random() * (imageCount - 1))]
                                        let secondaryImageCount = Math.floor(Math.random() * 15) + 2
                                        for (let counter = 0; counter < secondaryImageCount; counter++) {
                                            imageIndexArray.push(Math.floor(Math.random() * (imageCount - 1)))
                                        }
                                        imageIndexArray.forEach((imageIndex, arrayIndex) => {
                                            insertQueries.push(
                                                db.Photos.create({
                                                    productId: newDescription.productId,
                                                    primary: arrayIndex === 0,
                                                    originalName: files[imageIndex],
                                                    encoding: '7bit',
                                                    mimeType: 'image/jpeg',
                                                    size: fs.statSync(path.join(mockPhotoPath, files[imageIndex])).size,
                                                    data: fs.readFileSync(path.join(mockPhotoPath, files[imageIndex]))
                                                }))
                                        })
                                        return Promise.resolve(newDescription.productId)
                                    })
                            })
                        )
                    })
                return Promise.each(insertQueries, (productId) => {
                    console.log(productId)
                })
            })
            .then(() => {
                return done()
            })
            .catch((error) => {
                return done(error)
            })
    }
}
