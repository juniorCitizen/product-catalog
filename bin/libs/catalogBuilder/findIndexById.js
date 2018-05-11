// find object array position index within object array, where object.id === id
module.exports = (data, id) => {
  return data.findIndex(dataEntry => {
    return dataEntry.id === id
  })
}
