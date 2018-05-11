// extract one record from object array, where object.id === 0

const findIndexById = require('./findIndexById')

module.exports = data => {
  let index = findIndexById(data, 0)
  if (index === -1) {
    console.log('script terminated')
    console.log('id of 0 does not exist within dataset')
    process.exit(1)
  }
  return data.splice(index, 1)[0]
}
