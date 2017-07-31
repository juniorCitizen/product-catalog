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
                            <img :src="flagImgUrl(office.country)">
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

    export default {
        name: 'office-tabs',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                countries: 'countries',
                officeInfo: 'officeInfo',
                inViewOfficeId: 'inViewOfficeId'
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
            ...mapActions({}),
            flagImgUrl: function (countryName) {
                let alpha3Code = this.countries.filter((country) => {
                    return country.name === countryName
                })[0].alpha3Code
                return `${this.$eVars.HOST}:${this.$eVars.PORT}/${this.$eVars.SYS_REF}/api/countries/flags?country=${alpha3Code.toLowerCase()}`
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

<style scoped>
    div.column {
        padding-bottom: 0px;
    }
</style>
