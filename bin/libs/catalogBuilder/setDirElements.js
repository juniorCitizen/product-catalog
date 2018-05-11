// create certain elements within a directory
const fs = require('fs-extra')
const path = require('path')

const list = ['categoryPhoto', 'subcategories', 'products']

module.exports = dirPath => {
  list.forEach(item => {
    fs.ensureDirSync(path.join(dirPath, item))
  })
}
