<template>
    <span :class="responsiveClasses"
          :style="responsiveStyle">
        <template v-if="isMobile">
            <span class="column">
                <div v-for="(emailEntry,index) in emailList"
                     :key="index"
                     class="columns is-mobile">
                    <a class="column is-mobile"
                       :style="responsiveStyle"
                       :href="'mailto:'+emailEntry.data">
                        {{emailEntry.label}}&nbsp;({{emailEntry.data}})
                    </a>
                </div>
            </span>
        </template>
        <template v-else>
            <div v-for="(emailEntry,index) in emailList"
                 :key="index"
                 class="columns is-mobile">
                <a class="column"
                   :href="'mailto:'+emailEntry.data">
                    {{emailEntry.label}}&nbsp;({{emailEntry.data}})
                </a>
            </div>
        </template>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'email-field',
        components: {},
        props: ['emailList'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            responsiveClasses: function () {
                return {
                    'column columns has-text-centered is-mobile': this.isMobile,
                    'column': !this.isMobile
                }
            },
            responsiveStyle: function () {
                return {
                    // 'border': '1px solid red',
                    'padding-top': '2px',
                    'padding-bottom': '2px'
                }
            }
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
    a.column.is-mobile {
        font-size: 70%;
    }

    a:hover {
        font-weight: bold;
    }
</style>
