<template>
    <aside class="menu box">
        <template v-for="(section,arrayIndex) in rootMenu">
            <p class="menu-label"
               @click="loadSubmenu(arrayIndex)"
               :key="arrayIndex">
                <a>{{ section.title }}</a>
            </p>
            <product-series-menu v-if="(section.submenu.length>0)&&section.active"
                                 :menu="section.submenu"
                                 :key="section.title">
            </product-series-menu>
        </template>
    </aside>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSeriesMenu from './ProductSeriesMenu.vue'

    export default {
        name: 'product-selection-menu',
        components: { ProductSeriesMenu },
        props: [],
        data: function () {
            return {
                rootMenu: null
            }
        },
        computed: {
            ...mapGetters({
                adminMenu: 'adminMenu',
                productSeriesData: 'productSeriesData',
                productCatalogData: 'productCatalogData'
            }),
            childrenHasSubmenu: function () {
                let checkState = false
                if (this.adminMenu.length > 0) {
                    this.adminMenu.forEach((menuItem) => {
                        if (menuItem.submenu.length > 0) {
                            checkState = true
                        }
                    })
                }
                return checkState
            }
        },
        watch: {
            productSeriesData: function (updatedDataArray) {
                this.rootMenu[0].submenu = []
                updatedDataArray.forEach((productSeries) => {
                    this.rootMenu[0].submenu.push({
                        title: productSeries.reference,
                        active: false,
                        hover: false,
                        submenu: [],
                        data: productSeries
                    })
                })
            },
            productCatalogData: function (updatedDataArray) {
                updatedDataArray.forEach((productsInSeries, indexCounter) => {
                    this.rootMenu[0].submenu[indexCounter].submenu = []
                    if (productsInSeries.products.length > 0) {
                        productsInSeries.products.forEach((product) => {
                            this.rootMenu[0].submenu[indexCounter].submenu.push({
                                title: product.itemCode,
                                active: false,
                                hover: false,
                                submenu: [],
                                data: product
                            })
                        })
                    }
                })
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({ fetchProductCatalogData: 'fetchProductCatalogData' }),
            loadSubmenu: function (targetIndex) {
                this.rootMenu[targetIndex].active = !this.rootMenu[targetIndex].active
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () {
            this.rootMenu = this.adminMenu.slice()
            this.productSeriesData.forEach((productSeries) => {
                this.rootMenu[0].submenu.push({
                    title: productSeries.reference,
                    active: false,
                    hover: false,
                    submenu: [],
                    data: productSeries
                })
            })
            this.productCatalogData.forEach((productsInSeries, indexCounter) => {
                this.rootMenu[0].submenu[indexCounter].submenu = []
                if (productsInSeries.products.length > 0) {
                    productsInSeries.products.forEach((product) => {
                        this.rootMenu[0].submenu[indexCounter].submenu.push({
                            title: product.itemCode,
                            active: false,
                            hover: false,
                            submenu: [],
                            data: product
                        })
                    })
                }
            })
        },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
