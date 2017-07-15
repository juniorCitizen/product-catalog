import axios from 'axios'

export default {
    install: (Vue, name = '$http') => {
        Object.defineProperty(Vue.prototype, name, { value: axios })
    }
}
