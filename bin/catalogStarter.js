/**
 * construct empty catalog folder structure
 * with unsorted product folders.  Users can
 * then add the appropriate data files and
 * categorize the products as needed
 */

const fs = require('fs-extra')
const path = require('path')

const ensureEmptyArray = require('./libs/catalogBuilder/ensureEmptyArray')
const extractChildren = require('./libs/catalogBuilder/extractChildren')
const extractRoot = require('./libs/catalogBuilder/extractRoot')
const setDirElements = require('./libs/catalogBuilder/setDirElements')

const config = require('./libs/config')
const rootPath = config.catalogRootPath
const backupPath = config.catalogBackupFilePath

// get seed data
const seedData = require('./libs/seedData')
let categoryData = seedData.getCategories()
let productData = seedData.getProducts()

// make sure the catalog folder existed
fs.ensureDirSync(rootPath)
// remove existing subfolders and re-create
fs.removeSync(path.join(rootPath, 'categoryPhoto'))
fs.removeSync(path.join(rootPath, 'subcategories'))
fs.removeSync(path.join(rootPath, 'products'))

// get root node data
let rootNode = extractRoot(categoryData)
let parsedCatalog = {
  id: rootNode.id,
  path: rootPath,
  name: rootNode.name,
  slug: rootNode.slug,
  description: rootNode.description,
  photo: null,
  subcategories: [],
  products: [],
}
// turn seed data into object tree format
parseNode(categoryData, parsedCatalog)
// check if all catalog records in seed data are processed
ensureEmptyArray(categoryData)
// generate empty product folder under root 'products' dir
productData.forEach(product => {
  let productPath = path.join(rootPath, 'products', product.code)
  fs.ensureDirSync(productPath)
})

// save parsed catalog into a json file
fs.outputJsonSync(backupPath, parsedCatalog)
// execution successfully completed
console.log('catalog structure generation completed')

/**
 * scripts
 */

// process a node and its corresponding data recursively
function parseNode(data, node) {
  setDirElements(node.path)
  let children = extractChildren(data, node.id)
  node.subcategories = children.map(child => {
    return {
      id: child.id,
      path: path.join(node.path, 'subcategories', `${child.id}-${child.name}`),
      name: child.name,
      slug: child.slug,
      description: child.description,
      photo: null,
      subcategories: [],
      products: [],
    }
  })
  node.subcategories.forEach(subcategory => {
    parseNode(data, subcategory)
  })
}
