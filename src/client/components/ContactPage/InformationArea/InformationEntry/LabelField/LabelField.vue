<template>
    <span :class="responseClasses"
          :style="dynamicPaddingStyle">
        <b>
            <template v-if="isMobile">
                <u>{{label}}</u>
            </template>
            <template v-else>{{label}}</template>
        </b>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'label-field',
        components: {},
        props: ['label'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            responseClasses: function () {
                return {
                    'column has-text-centered': this.isMobile,
                    'column is-2-desktop is-3-touch': !this.isMobile
                }
            },
            dynamicPaddingStyle: function () {
                if (this.isMobile) {
                    return {
                        // 'border': '1px solid black',
                        'padding-top': '2px',
                        'padding-bottom': '10px'
                    }
                } else if (!this.isWidescreen) {
                    return {
                        // 'border': '1px solid black',
                        'padding-top': '2px',
                        'padding-bottom': '2px'
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
