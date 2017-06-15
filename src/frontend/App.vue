<template lang="html">
    <div class="row">
        <div class="columns small-12">
            <router-link class="button hollow" to="/productCatalog">Home</router-link>
            <router-link class="button" to="/productCatalog/products">Product Catalog</router-link>
            <router-link class="button large" to="/productCatalog/products/123">Product Details</router-link>
            <router-link class="button warning" to="/productCatalog/inquiry">Inquiry</router-link>
            <router-link class="button secondary" to="/productCatalog/contacts">Contact Us</router-link>
            <router-link class="tiny button" to="/productCatalog/admin">Login</router-link>
        </div>
        <div class="columns small-12">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import store from './store/store'
import homePage from './components/HomePage.vue'

export default {
    name: 'app',
    store: store,
    components: {
        homePage
    },
    data: () => {
        return {}
    },
    computed: {
        ...mapGetters({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({})
    }
}
</script>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
