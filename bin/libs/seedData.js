const path = require('path')

const excelToJson = require('convert-excel-to-json')

const config = require('./config')
const seedDataFilePath = config.seedDataFilePath
const carouselSlideDirPath = config.carouselSlideDirPath

module.exports = {
  getSalesContacts,
  getHostingCompanies,
  getCarouselSlides,
  getProducts,
  getCategories,
  getCertifications,
}

function getCertifications() {
  return excelToJson({
    sourceFile: seedDataFilePath,
    header: {rows: 1},
    columnToKey: {
      A: 'companyName',
      B: 'type',
      C: 'logoFileName',
    },
    sheets: ['certifications'],
  })['certifications']
}

function getSalesContacts() {
  return excelToJson({
    sourceFile: seedDataFilePath,
    header: {rows: 1},
    columnToKey: {
      A: 'name',
      B: 'email',
      C: 'mobile',
      D: 'companyName',
    },
    sheets: ['sales contacts'],
  })['sales contacts']
}

function getHostingCompanies() {
  return excelToJson({
    sourceFile: seedDataFilePath,
    header: {rows: 1},
    columnToKey: {
      A: 'name',
      B: 'address',
      C: 'telephone',
      D: 'fax',
      E: 'country',
    },
    sheets: ['hosting companies'],
  })['hosting companies']
}

function getCarouselSlides() {
  return excelToJson({
    sourceFile: seedDataFilePath,
    header: {rows: 1},
    columnToKey: {
      A: 'titleText',
      B: 'mobileTitleText',
      C: 'mottoText',
      D: 'imageFileName',
    },
    sheets: ['carousel slides'],
  })['carousel slides'].map(slide => {
    return {
      titleText: slide.titleText || '',
      mobileTitleText: slide.mobileTitleText || '',
      mottoText: slide.mottoText || '',
      imageFileName: slide.imageFileName,
      imagePath: path.join(carouselSlideDirPath, slide.imageFileName),
    }
  })
}

function getProducts() {
  let productData = excelToJson({
    sourceFile: seedDataFilePath,
    header: {rows: 1},
    columnToKey: {
      A: 'code',
      B: 'name',
      C: 'description',
      D: 'primaryPhotoFileName',
      E: 'specificationText',
      F: 'weightCap',
      G: 'minHeight',
      H: 'maxHeight',
    },
    sheets: ['products'],
  })['products']
  // test for duplicated product code
  for (let x = 0, length = productData.length; x < length; x++) {
    let searchResults = productData.filter(product => {
      return product.code === productData[x].code
    })
    if (searchResults.length !== 1) {
      console.log('script terminated')
      console.log(`duplicate product code of '${productData[x].code}' found`)
      process.exit(1)
    }
  }
  return productData
}

function getCategories() {
  let categoryData = excelToJson({
    sourceFile: seedDataFilePath,
    header: {rows: 1},
    columnToKey: {
      A: 'id',
      B: 'name',
      C: 'slug',
      D: 'parentCategoryId',
      E: 'description',
    },
    sheets: ['categories'],
  })['categories']
  // test for duplicated catalog id
  for (let x = 0, length = categoryData.length; x < length; x++) {
    let searchResults = categoryData.filter(category => {
      return category.id === categoryData[x].id
    })
    if (searchResults.length !== 1) {
      console.log('script terminated')
      console.log(`duplicate categoryId of '${categoryData[x].id}' found`)
      process.exit(1)
    }
  }
  return categoryData
}
