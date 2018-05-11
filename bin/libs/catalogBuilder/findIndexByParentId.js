// find object array position index within object array, where object.parentId === parentId
module.exports = (data, parentId) => {
  // console.log(data)
  // console.log(parentId)
  return data.findIndex(dataEntry => {
    return dataEntry.parentCategoryId === parentId
  })
}
