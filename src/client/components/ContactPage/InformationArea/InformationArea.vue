<template>
    <div class="column box">
        <company-title :companyTitle="officeInfo.title"></company-title>
        <template v-for="(dataEntry,index) in officeInfo.data">
            <information-entry :key="index"
                               :label="dataEntry.label"
                               :data="dataEntry.data">
            </information-entry>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import CompanyTitle from './CompanyTitle/CompanyTitle.vue'
    import InformationEntry from './InformationEntry/InformationEntry.vue'

    export default {
        name: 'information-area',
        components: {
            CompanyTitle,
            InformationEntry
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                officeInfo: 'inViewOfficeInfo'
            })
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

<style scoped>
    span.title {
        font-weight: bolder;
    }
</style>
