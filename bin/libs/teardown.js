const Promise = require('bluebird')

const api = require('./storyblokApi')

module.exports = {
  removeExistingAssets: () => {
    return api
      .getAssets()
      .then(existingAssets =>
        Promise.each(existingAssets, asset => {
          return api.deleteAsset(asset.id)
        })
      )
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  removeExistingStories: () => {
    return api
      .getStories()
      .then(existingStories =>
        Promise.all(existingStories.map(story => api.deleteStory(story.id)))
      )
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  removeExistingComponents: () => {
    return api
      .getComponents()
      .then(existingComponents =>
        Promise.all(
          existingComponents.map(component => api.deleteComponent(component.id))
        )
      )
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
}
