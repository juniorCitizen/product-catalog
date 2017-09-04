<template>
    <ul class="menu-list">
        <menu-list-item v-for="(data,dataIndex) in dataList"
                        :data="data"
                        :key="dataIndex">
        </menu-list-item>
    </ul>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MenuListItem from './MenuListItem.vue'

    export default {
        name: 'menu-list',
        components: {
            MenuListItem
        },
        props: [
            'dataList'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({})
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
