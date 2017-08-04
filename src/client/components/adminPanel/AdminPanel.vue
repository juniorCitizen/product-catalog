<template>
    <div class="hero-body">
        <div class="container columns">
            <span class="column is-narrow">
                <product-selection-menu>
                </product-selection-menu>
            </span>
            <span class="column">
                <product-data-form :productToEdit="productToEdit">
                </product-data-form>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSelectionMenu from './ProductSelectionMenu/ProductSelectionMenu.vue'
    import ProductDataForm from './ProductDataForm/ProductDataForm.vue'

    export default {
        name: 'admin-panel',
        components: {
            ProductDataForm,
            ProductSelectionMenu
        },
        props: [],
        data: function () {
            return {
                productToEdit: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({ toggleProductEditMode: 'toggleProductEditMode' }),
            ...mapActions({})
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () {
            this.toggleProductEditMode()
        }
    }
</script>

<style scoped></style>
