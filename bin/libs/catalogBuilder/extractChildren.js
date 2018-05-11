const findIndexByParentId = require('./findIndexByParentId')

// extract an object array by finding matches of object.parentId
module.exports = (data, parentId) => {
  let children = []
  let index = null
  // console.log(data.length)
  do {
    index = findIndexByParentId(data, parentId)
    if (index !== -1) {
      children.push(data.splice(index, 1)[0])
    }
  } while (index !== -1)
  // console.log(data.length)
  // sort before return
  return children.sort((a, b) => {
    return a.id - b.id
  })
}
