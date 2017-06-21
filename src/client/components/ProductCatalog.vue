<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title is-1">
                <i>OUR PRODUCTS</i>
            </h1>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'productCatalog',
        components: {},
        data: function () {
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

<style scoped>

</style>
