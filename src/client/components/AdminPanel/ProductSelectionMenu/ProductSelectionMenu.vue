<template>
    <aside class="menu box">
        <template v-for="(section,arrayIndex) in adminMenu">
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
            return {}
        },
        computed: {
            ...mapGetters({ adminMenu: 'adminMenu' }),
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
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            loadSubmenu: function (targetIndex) {
                this.adminMenu[targetIndex].active = !this.adminMenu[targetIndex].active
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
