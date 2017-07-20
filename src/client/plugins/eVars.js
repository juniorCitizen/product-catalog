import eVars from '../../server/config/environment'

export default {
    install: (Vue, name = '$http') => {
        Object.defineProperty(Vue.prototype, name, { value: eVars })
    }
}
