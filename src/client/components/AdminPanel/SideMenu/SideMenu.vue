<template>
    <aside class="menu box">
        <menu-label :labelText="'登出'"
                    :action="logout">
        </menu-label>
        <menu-label :labelText="'產品系列'"
                    :action="toggleSeriesMenu">
        </menu-label>
        <menu-list v-if="dataList.length>0"
                   :dataList="dataList">
        </menu-list>
    </aside>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MenuLabel from './MenuLabel.vue'
    import MenuList from './MenuList.vue'

    export default {
        name: 'side-menu',
        components: {
            MenuLabel,
            MenuList
        },
        props: [],
        data: function () {
            return {
                dataList: []
            }
        },
        computed: {
            ...mapGetters({
                series: 'series/data'
            })
        },
        watch: {},
        methods: {
            ...mapMutations({
                logout: 'credentials/logout'
            }),
            ...mapActions({}),
            toggleSeriesMenu: function () {
                if (this.dataList.length === 0) {
                    this.dataList = this.series.slice()
                } else {
                    this.dataList = []
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
