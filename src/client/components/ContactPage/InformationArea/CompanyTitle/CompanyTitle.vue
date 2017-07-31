<template>
    <div class="columns">
        <span class="column"
              :class="{'has-text-centered':isMobile}">
            <template v-if="isMobile">
                <b>
                    <u>{{ companyTitle }}</u>
                </b>
            </template>
            <template v-else-if="!isMobile&&!isWidescreen">
                <h3 class="notification is-success title is-3"
                    :style="responsiveBannerStyle">
                    <b>{{ companyTitle }}</b>
                </h3>
            </template>
            <template v-else>
                <h1 class="notification is-success title is-1"
                    :style="responsiveBannerStyle">
                    <b>{{ companyTitle }}</b>
                </h1>
            </template>
        </span>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'company-title',
        components: {},
        props: ['companyTitle'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            responsiveBannerStyle: function () {
                if (this.isMobile) {
                    return {
                        'padding-top': 'auto',
                        'padding-bottom': 'auto'
                    }
                }
                if (!this.isMobile && !this.isWidescreen) {
                    return {
                        'padding-top': '5px',
                        'padding-bottom': '5px'
                    }
                } else {
                    return {
                        'padding-top': '5px',
                        'padding-bottom': '5px'
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
