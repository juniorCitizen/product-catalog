import axios from 'axios'

const state = () => {
  return {
    apiToken:
      process.env.NODE_ENV === 'production'
        ? process.env.STORYBLOK_API_PUBLIC_TOKEN
        : process.env.STORYBLOK_API_PREVIEW_TOKEN,
    apiUrl: process.env.STORYBLOK_API_URL,
    catalog: {
      name: null,
      description: null,
      photo: null,
      accessUrl: null,
      slug: 'product-catalog-page/',
      subcategories: [],
      isActive: false,
      isLoading: false,
    },
    products: {
      data: [],
      activeProductIndex: null,
      currentPage: 1,
      perPage: process.env.PRODUCTS_PER_PAGE,
      totalProducts: 0,
    },
  }
}

const getters = {
  activeRootCategoryIndex(state) {
    if (state.catalog.subcategories.length === 0) return null
    let index = state.catalog.subcategories.findIndex(subcategory => {
      return subcategory.isActive === true
    })
    return index === -1 ? null : index
  },
  crumbs(state) {
    let crumbs = []
    crumbs.push(state.catalog)
    if (!state.catalog.subcategories) return crumbs
    do {
      let subcats = crumbs[crumbs.length - 1].subcategories
      let activeSubcatIdx = subcats.findIndex(subcat => {
        return subcat.isActive
      })
      if (activeSubcatIdx !== -1) {
        crumbs.push(subcats[activeSubcatIdx])
      } else break
    } while (crumbs[crumbs.length - 1].subcategories.length !== 0)
    return crumbs
  },
  products(state) {
    return state.products.data
  },
  activeProduct(state) {
    if (state.products.activeProductIndex === null) return null
    else return state.products.data[state.products.activeProductIndex]
  },
  activeProductIndex(state) {
    return state.products.activeProductIndex
  },
  paginationInfo(state) {
    let products = state.products
    return {
      currentPage: products.currentPage,
      totalPages: Math.ceil(products.totalProducts / products.perPage),
      perPage: products.perPage,
      totalProducts: products.totalProducts,
    }
  },
}

const actions = {
  getCategoryData(context, node) {
    context.commit('setLoadingState', {node, state: true})
    return axios({
      method: 'get',
      url: node.accessUrl,
      params: {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        is_startpage: true,
        token: context.state.apiToken,
      },
    })
      .then(res => {
        context.commit('registerCategory', {node, data: res.data})
        context.commit('setLoadingState', {node, state: false})
        return Promise.resolve(node)
      })
      .then(node => {
        return context.dispatch('getProductData', {node})
      })
      .catch(error => Promise.reject(error))
  },
  getProductData(context, {node = context.state.catalog, page = 1}) {
    return axios({
      method: 'get',
      url: `${context.state.apiUrl}/stories`,
      params: {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        is_startpage: false,
        starts_with: node.slug,
        sort_by: 'content.code:asc',
        per_page: context.state.products.perPage,
        token: context.state.apiToken,
        page,
      },
    })
      .then(res => {
        return context.commit('registerProducts', res)
      })
      .catch(error => Promise.reject(error))
  },
  switchCategory(context, payload) {
    let siblings = payload.siblings
    let activeIndex = siblings.findIndex(category => {
      return category.isActive === true
    })
    let targetNode = siblings[payload.targetIndex]
    context.commit('setLoadingState', {node: targetNode, state: true})
    return axios({
      method: 'get',
      url: targetNode.accessUrl,
      params: {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        is_startpage: true,
        token: context.state.apiToken,
      },
    })
      .then(res => {
        context.commit('registerCategory', {node: targetNode, data: res.data})
        context.commit('deactivateCategory', siblings[activeIndex])
        context.commit('setLoadingState', {node: targetNode, state: false})
        return Promise.resolve(targetNode)
      })
      .then(node => {
        return context.dispatch('getProductData', {node})
      })
      .catch(error => Promise.reject(error))
  },
}

const mutations = {
  deactivateCategory(state, node) {
    node.isActive = false
    node.subcategories = []
  },
  activateCategory(state, node) {
    node.isActive = true
  },
  registerCategory: (state, {node = state.catalog, data}) => {
    let slug = data.story.full_slug
    let content = data.story.content
    let subcategoryInfo = content.subcategories
    node.name = content.name
    node.description =
      content.description ||
      `Category description placeholder for '${content.name}'`
    node.photo = content.photo || null
    node.accessUrl = `${state.apiUrl}/stories/${slug}`
    node.slug = slug
    node.subcategories = subcategoryInfo.map(infoEntry => {
      return {
        name: infoEntry.name,
        accessUrl: `${node.accessUrl}${infoEntry.slug}`,
        slug: `${slug}${infoEntry.slug}`,
        subcategories: [],
        isActive: false,
        isLoading: false,
      }
    })
    node.isActive = true
    node.isLoading = false
  },
  setLoadingState(state, payload) {
    payload.node.isLoading = payload.state
  },
  clearProductList(state) {
    state.products = {
      data: [],
      activeProductIndex: null,
      currentPage: 1,
      perPage: state.products.perPage,
      totalProducts: 0,
    }
  },
  registerProducts(state, payload) {
    // deal with pagination
    state.products.activeProductIndex = null
    state.products.currentPage = payload.config.params.page
    state.products.perPage = parseInt(payload.headers['per-page'])
    state.products.totalProducts = parseInt(payload.headers.total)
    // deal with product data retrieval
    state.products.data = payload.data.stories.map(story => {
      let data = story.content
      return {
        name: data.name || `Product name placeholder for '${data.code}'`,
        code: data.code,
        description:
          data.description ||
          `Description for '${
            data.code
          }' is currently unavailable...\nDescription for '${
            data.code
          }' is currently unavailable...\nDescription for '${
            data.code
          }' is currently unavailable...\nDescription for '${
            data.code
          }' is currently unavailable...`,
        specification: {
          text:
            data.specification[0].text ||
            `Specification text for '${
              data.code
            }' is currently unavailable...\nSpecification text for '${
              data.code
            }' is currently unavailable...\nSpecification text for '${
              data.code
            }' is currently unavailable...\nSpecification text for '${
              data.code
            }' is currently unavailable...`,
          details: {
            weightCap: data.specification[0].details[0].weightCap || 'n/a',
            maxHeight: data.specification[0].details[0].maxHeight || 'n/a',
            minHeight: data.specification[0].details[0].minHeight || 'n/a',
            weight: data.specification[0].details[0].weight || 'n/a',
          },
        },
        primaryPhoto: data.primaryPhoto,
        secondaryPhotos: data.secondaryPhotos.map(photo => {
          return photo.url
        }),
      }
    })
  },
  setActiveProductIndex(state, productIndex) {
    state.products.activeProductIndex = productIndex
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
