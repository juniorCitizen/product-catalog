<template>
    <ul class="menu-list">
        <template v-for="(section,arrayIndex) in rootMenu">
            <template v-if="!childrenHasSubmenu">
                <product-series-entry :title="section.title"
                                      :arrayIndex="arrayIndex"
                                      :section="null"
                                      @selectEvent="loadSubmenu($event)"
                                      :key="arrayIndex">
                </product-series-entry>
                <product-series-menu v-if="(section.submenu.length>0)&&section.active"
                                     :menu="section.submenu"
                                     :key="arrayIndex">
                </product-series-menu>
            </template>
            <template v-else>
                <product-series-entry :title="section.title"
                                      :arrayIndex="arrayIndex"
                                      :section="section"
                                      @selectEvent="loadSubmenu($event)"
                                      :key="arrayIndex">
                </product-series-entry>
            </template>
        </template>
    </ul>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSeriesEntry from './ProductSeriesEntry.vue'
    import ProductSeriesMenu from './ProductSeriesMenu.vue'

    export default {
        name: 'product-series-menu',
        components: {
            ProductSeriesMenu,
            ProductSeriesEntry
        },
        props: ['menu'],
        data: function () {
            return {
                rootMenu: null
            }
        },
        computed: {
            ...mapGetters({}),
            childrenHasSubmenu: function () {
                let checkState = false
                if (this.menu.length > 0) {
                    this.menu.forEach((menuItem) => {
                        if (menuItem.submenu.length > 0) {
                            checkState = true
                        }
                    })
                }
                return checkState
            }
        },
        watch: {
            menu: function (updatedMenu) {
                this.rootMenu = updatedMenu.slice()
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            loadSubmenu: function (targetIndex) {
                this.rootMenu[targetIndex].active = !this.rootMenu[targetIndex].active
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () {
            this.rootMenu = this.menu.slice()
        },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
