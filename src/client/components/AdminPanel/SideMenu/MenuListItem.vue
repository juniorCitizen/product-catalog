<template>
    <li>
        <a :class="{'is-active':isActive&&(dataList.length>0)}"
           @click="isActive=!isActive">
            {{ data.reference }}
        </a>
        <menu-list v-if="dataList.length>0"
                   :dataList="dataList">
        </menu-list>
    </li>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MenuList from './MenuList.vue'

    export default {
        name: 'menu-list-item',
        components: {
            MenuList
        },
        props: [
            'data'
        ],
        data: function () {
            return {
                isActive: false,
                dataList: []
            }
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
