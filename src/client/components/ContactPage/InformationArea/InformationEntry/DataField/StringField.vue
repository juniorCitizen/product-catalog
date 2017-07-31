<template>
    <span :class="responsiveClasses"
          :style="responsiveStyle">
        <template v-if="isMobile">
            <span class="column is-1"></span>
            <span class="column"
                  :style="responsiveStyle">{{stringData}}</span>
            <span class="column is-1"></span>
        </template>
        <template v-else>
            {{stringData}}
        </template>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'string-field',
        components: {},
        props: ['stringData'],
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
                if (this.isMobile) {
                    return {
                        // 'border': '1px solid red',
                        'padding-top': '0px',
                        'padding-bottom': '0px'
                    }
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
