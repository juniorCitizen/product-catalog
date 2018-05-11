// extract one record from object array
// where object.id === id

const findIndexById = require('./findIndexById')

module.exports = (data, id) => {
  let index = findIndexById(data, id)
  if (index === -1) {
    console.log('script terminated')
    console.log(`id: ${id} does not exist within dataset`)
    process.exit(1)
  }
  return data.splice(index, 1)[0]
}
