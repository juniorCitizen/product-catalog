<template>
    <span :class="responsiveClasses"
          :style="responsiveStyle">
        <template v-if="isMobile">
            <span class="column is-1"></span>
            <span class="column"
                  :style="responsiveStyle">
                <a :href="urlString">{{urlString}}</a>
            </span>
            <span class="column is-1"></span>
        </template>
        <template v-else>
            <a :href="urlString">{{urlString}}</a>
        </template>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'web-link-field',
        components: {},
        props: ['urlString'],
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

<style scoped></style>
