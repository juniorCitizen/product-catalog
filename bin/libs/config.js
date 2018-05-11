const path = require('path')

const catalogRootPath = './bin/seedData/catalog'
const carouselSlideDirPath = './bin/seedData/carouselPhotos'
const seedDataFilePath = './bin/seedData/seedData.xlsx'
const catalogBackupFilePath = './bin/seedData/catalog.json'
const flatProductList = './bin/seedData/flatProductList.json'
const certificationLogoDirPath = './bin/seedData/certifications'

module.exports = {
  catalogRootPath: path.resolve(catalogRootPath),
  carouselSlideDirPath: path.resolve(carouselSlideDirPath),
  seedDataFilePath: path.resolve(seedDataFilePath),
  catalogBackupFilePath: path.resolve(catalogBackupFilePath),
  flatProductListFilePath: path.resolve(flatProductList),
  certificationLogoDirPath: path.resolve(certificationLogoDirPath),
}
