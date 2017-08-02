<template>
    <div class="column">
        <div class="tabs is-boxed">
            <ul>
                <li v-for="(office, index) in officeInfo"
                    :key="index"
                    :class="{'is-active':index===inViewOfficeId}">
                    <a @click="switchInViewOfficeId(index)">
                        <span class="icon"
                              :class="dynamicIconClass">
                            <flag-image :country="office.country"></flag-image>
                        </span>
                        <span>
                            <b>{{ office.country }}</b>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import FlagImage from './FlagImage.vue'

    export default {
        name: 'office-tabs',
        components: { FlagImage },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                officeInfo: 'officeInfo',
                inViewOfficeId: 'inViewOfficeId',
                initializationStatus: 'initializationStatus'
            }),
            dynamicIconClass: function () {
                return {
                    'is-small': this.isMobile,
                    'is-medium': !this.isMobile
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({ switchInViewOfficeId: 'switchInViewOfficeId' }),
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
    div.column {
        padding-bottom: 0px;
    }
</style>
