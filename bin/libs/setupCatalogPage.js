const fs = require('fs-extra')
const path = require('path')
const Promise = require('bluebird')
const slugify = require('slugify')

const api = require('./storyblokApi')
const parseId = require('./catalogBuilder/parseId')
const extractById = require('./catalogBuilder/extractById')
const extractByCode = require('./catalogBuilder/extractByCode')

const config = require('./config')

const seedData = require('./seedData')
let dataset = {
  categories: seedData.getCategories(),
  products: seedData.getProducts(),
  flatProductList: [],
}

module.exports = () => {
  let catalog = {path: config.catalogRootPath}
  return parseNode(catalog, 0, dataset)
    .then(() => {
      // check if orphan category or product data exists
      console.log(`[${dataset.categories.length}] orphan catalog data entries`)
      console.log(dataset.categories)
      console.log(`[${dataset.products.length}] orphan product data entries`)
      console.log(dataset.products)
      return Promise.resolve()
    })
    .catch(error => Promise.reject(error))
}

function parseNode(
  node,
  parentId,
  {categories: categoryData, products: productData, flatProductList}
) {
  // make sure the current node's working path exists
  return fs
    .ensureDir(node.path)
    .then(() => {
      node.parentId = parentId
      return createCategoryFolder(node, categoryData)
    })
    .then(() => {
      // compose start page information
      node.startPageInfo = {
        name: node.name,
        slug: '', // forced to match parent folder slug
        content: {
          component: 'Category Page',
          name: node.name,
          description: node.description,
          photo: null, // temporary and set at later stage
          subcategories: [], // temporary and set at later stage
        },
        path: 'catalog',
        is_startpage: true,
        parent_id: node.folder.id,
      }
      return Promise.resolve()
    })
    .then(() => {
      // deal with category photo
      node.photoPath = path.join(node.path, 'categoryPhoto')
      return fs
        .ensureDir(node.photoPath)
        .then(() => fs.readdir(node.photoPath))
        .then(files => {
          if (files.length === 0) {
            return Promise.resolve()
          } else {
            return api
              .uploadAsset(path.join(node.photoPath, files[0]))
              .then(prettyUrl => {
                node.startPageInfo.content.photo = prettyUrl
                return Promise.resolve()
              })
              .catch(error => Promise.reject(error))
          }
        })
        .catch(error => Promise.reject(error))
    })
    .then(() => {
      // deal with subcategory information
      node.subcategoryPath = path.join(node.path, 'subcategories')
      return fs
        .ensureDir(node.subcategoryPath)
        .then(() => fs.readdir(node.subcategoryPath))
        .then(dirs => {
          node.subcategories = dirs.map(dir => {
            return {path: path.join(node.subcategoryPath, dir)}
          })
          let subcategoryData = categoryData
            .filter(subcategory => {
              return subcategory.parentCategoryId === node.id
            })
            .sort((a, b) => {
              return a.id - b.id
            })
          node.startPageInfo.content.subcategories = subcategoryData.map(
            subcategory => {
              return {
                component: 'Subcategory',
                name: subcategory.name,
                slug: subcategory.slug + '-category-page',
              }
            }
          )
          return Promise.resolve()
        })
        .catch(error => Promise.reject(error))
    })
    .then(() => {
      // create start page
      return api
        .createStory({story: node.startPageInfo})
        .then(startPage => {
          node.startPage = startPage
          return Promise.resolve()
        })
        .catch(error => Promise.reject(error))
    })
    .then(() => {
      // deal with products
      let productPath = path.join(node.path, 'products')
      return fs
        .ensureDir(productPath)
        .then(() => fs.readdir(productPath))
        .then(prodCodes => {
          node.productInfo = prodCodes.map(code => {
            let data = extractByCode(productData, code)
            return {
              path: path.join(productPath, code),
              data,
              pageInfo: {
                name: data.code,
                slug: slugify(data.code, {lower: true}) + '-product-page',
                content: {
                  component: 'Product Page',
                  name: data.name || null,
                  code: data.code,
                  description: data.description || null,
                  specification: [
                    {
                      component: 'Specification',
                      text: data.specificationText || null,
                      details: [
                        {
                          component: 'Specification Details',
                          weightCap: data.weightCap || null,
                          minHeight: data.minHeight || null,
                          maxHeight: data.maxHeight || null,
                          weight: data.weight || null,
                        },
                      ],
                    },
                  ],
                  primaryPhoto: null,
                  secondaryPhotos: [],
                },
                path: 'catalog',
                is_startpage: false,
                parent_id: node.folder.id,
              },
            }
          })
          return Promise.resolve()
        })
        .then(() => {
          // deal with product photos (sequentially, by each product)
          return Promise.each(node.productInfo, (entry, index) => {
            let currProd = node.productInfo[index]
            // read photos from directory
            return fs
              .readdir(entry.path)
              .then(files => {
                if (files.length === 0) {
                  // omit process if no photos existed in directory
                  currProd.primaryPhotoPath = null
                  currProd.secondaryPhotoPaths = []
                  return Promise.resolve()
                } else {
                  // deal with primary photo information
                  let primaryPhotoIndex = files.findIndex(file => {
                    return file === entry.data.primaryPhotoFileName
                  })
                  primaryPhotoIndex =
                    primaryPhotoIndex === -1 ? 0 : primaryPhotoIndex
                  let primaryPhotoPath = path.join(
                    entry.path,
                    files.splice(primaryPhotoIndex, 1)[0]
                  )
                  currProd.primaryPhotoPath = primaryPhotoPath
                  // deal with 2ndary photo information
                  let secondaryPhotoPaths = files.map(file => {
                    return path.join(entry.path, file)
                  })
                  currProd.secondaryPhotoPaths = secondaryPhotoPaths
                }
              })
              .catch(error => Promise.reject(error))
          }).catch(error => Promise.reject(error))
        })
        .then(() => {
          // batch product page creation
          return Promise.map(node.productInfo, (product, index) => {
            return api
              .createStory({story: product.pageInfo})
              .then(productPage => {
                // save product page story info
                node.productInfo[index].productPage = productPage
                if (product.primaryPhotoPath !== null) {
                  flatProductList.push({
                    id: productPage.id,
                    code: productPage.name,
                    primaryPhotoPath: product.primaryPhotoPath,
                    secondaryPhotoPaths: product.secondaryPhotoPaths,
                    uploaded: false,
                  })
                }
                return Promise.resolve()
              })
              .catch(error => Promise.reject(error))
          })
        })
        .catch(error => Promise.reject(error))
    })
    .then(() => {
      // deal with subcategories using recursion
      // has to proceed sequentially in order to maintain user set order
      return Promise.map(node.subcategories, (subcategory, index) => {
        let currentNode = node.subcategories[index]
        let parentId = node.folder.id
        return parseNode(currentNode, parentId, dataset)
          .then(() => Promise.resolve())
          .catch(error => Promise.reject(error))
      })
    })
    .then(() => {
      return fs.outputJson(config.catalogBackupFilePath, node)
    })
    .then(() => {
      return fs.outputJson(config.flatProductListFilePath, flatProductList)
    })
    .catch(error => Promise.reject(error))
}

// create category folder
function createCategoryFolder(node, categoryData) {
  // extract user defined category id
  let id = parseId(node.path)
  // extract record by matching with user defined id
  let record = extractById(categoryData, id)
  // save retrieved data
  for (let key in record) {
    node[key] = record[key]
  }
  // compose folder information
  node.folderInfo = {
    name: record.name + ' Folder',
    slug:
      record.id === 0 ? record.slug + '-page' : record.slug + '-category-page',
    is_folder: true,
    default_root: 'Category Page',
    parent_id: node.parentId,
  }
  // make api call to create the category folder
  return api
    .createStory({story: node.folderInfo})
    .then(folder => {
      node.folder = folder // save folder info
      return Promise.resolve()
    })
    .catch(error => Promise.reject(error))
}
