<template>
    <aside class="menu box">
        <p class="menu-label">
            <a @click="logout">登出</a>
        </p>
        <p class="menu-label">
            <a @click="toggleSeriesMenu">產品系列</a>
        </p>
        <ul v-if="seriesMenu.length>0"
            class="menu-list">
            <li v-for="(seriesMenuItem,seriesIndex) in seriesMenu"
                :key="seriesMenuItem.id">
                <a @click="toggleProductMenu(seriesIndex)">
                    {{seriesMenuItem.reference}}
                </a>
                <ul v-if="seriesMenuItem.visible && seriesMenuItem.products.length>0"
                    class="menu-list">
                    <li v-for="product in seriesMenuItem.products"
                        :key="product.code">
                        <a @click="updateRecord(product)">
                            {{product.code}}
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'side-menu',
        components: {},
        props: [],
        data: function () {
            return {
                seriesMenu: []
            }
        },
        computed: {
            ...mapGetters({
                series: 'series/data',
                flowControl: 'flowControl/activated'
            })
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            updateRecord: function (productData) {
                if (!this.flowControl) {
                    this.$store.commit('productData/updateRecord', productData)
                }
            },
            logout: function () {
                if (!this.flowControl) {
                    this.$store.commit('credentials/logout')
                }
            },
            toggleSeriesMenu: function () {
                if (!this.flowControl) {
                    if (this.seriesMenu.length === 0) {
                        this.series.forEach((seriesItem) => {
                            this.seriesMenu.push({
                                reference: seriesItem.reference,
                                products: seriesItem.products,
                                visible: false
                            })
                        })
                    } else {
                        this.seriesMenu = []
                    }
                }
            },
            toggleProductMenu: function (seriesIndex) {
                if (!this.flowControl) {
                    if (this.seriesMenu[seriesIndex].visible === true) {
                        this.seriesMenu[seriesIndex].visible = !this.seriesMenu[seriesIndex].visible
                    } else {
                        for (let counter = 0; counter < this.seriesMenu.length; counter++) {
                            this.seriesMenu[counter].visible = false
                        }
                        this.seriesMenu[seriesIndex].visible = true
                    }
                }
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
