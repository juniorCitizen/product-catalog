<template>
    <div class="hero-body"
         :style="dynamicStyle">
        <h6 v-if="!regCompletionFlag"
            class="notification is-info has-text-centered"
            :class="dynamicBannerSizing"
            :style="responsiveBannerStyle">
            <b>
                <i>REGISTER FOR OUR PDF CATALOG</i>
            </b>
        </h6>
        <h6 v-else
            class="notification is-info">
            <b>
                <i>THANK YOU, {{ userName.toUpperCase() }}.</i>
                <br>
                <i>REGISTRATION IS COMPLETED.</i>
                <br>
                <i>YOU WILL RECEIVE OUR PDF CATALOG SHORTLY...</i>
            </b>
        </h6>
        <template v-if="!regCompletionFlag">
            <company-field></company-field>
            <name-field></name-field>
            <email-field></email-field>
            <region-selector @regionSelected="regionSelectionEvent($event)">
            </region-selector>
            <country-selector @countrySelected="countrySelectionEvent($event)">
            </country-selector>
            <comments-field></comments-field>
            <bot-prevention-field></bot-prevention-field>
            <submit-controls></submit-controls>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import BotPreventionField from './Fields/BotPreventionField.vue'
    import CommentsField from './Fields/CommentsField.vue'
    import CompanyField from './Fields/CompanyField.vue'
    import CountrySelector from './Fields/CountrySelector.vue'
    import EmailField from './Fields/EmailField.vue'
    import NameField from './Fields/NameField.vue'
    import RegionSelector from './Fields/RegionSelector.vue'
    import SubmitControls from './Fields/SubmitControls.vue'

    export default {
        name: 'registration',
        components: {
            BotPreventionField,
            CommentsField,
            CompanyField,
            CountrySelector,
            EmailField,
            NameField,
            RegionSelector,
            SubmitControls
        },
        props: [],
        data: function () {
            return {
                region: null,
                country: null
            }
        },
        computed: {
            ...mapGetters({
                regions: 'regions',
                regionInStore: 'userRegion',
                countries: 'countries',
                filteredCountryList: 'filteredCountryList',
                countryInStore: 'userCountry',
                regCompletionFlag: 'regCompletionFlag',
                userName: 'userName'
            }),
            dynamicBannerSizing: function () {
                return {
                    'is-paddingless': this.isTouch,
                    'is-size-4': !this.isTouch && !this.isFullhd,
                    'is-size-1': this.isFullhd
                }
            },
            dynamicStyle: function () {
                if (this.isTouch) {
                    return {
                        'padding-top': '5px',
                        'padding-bottom': '30px'
                    }
                }
            },
            responsiveBannerStyle: function () {
                if (!this.isTouch) {
                    return {
                        'padding-top': '5px',
                        'padding-bottom': '5px'
                    }
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({ updateUserData: 'updateUserData' }),
            ...mapActions({}),
            getRegionName: function (countryName) {
                if (countryName === 'Country') {
                    return 'All Regions'
                } else {
                    return this.countries.filter((country) => {
                        return country.name === countryName
                    })[0].region
                }
            },
            regionSelectionEvent: function (newRegion) {
                this.region = newRegion
                this.country = this.countries[0] ? this.countries[0].name : 'Country'
                this.updateUserData({
                    region: this.region,
                    country: this.country
                })
            },
            countrySelectionEvent: function (newCountry) {
                this.country = newCountry
                this.updateUserData({
                    country: this.country
                })
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.region = this.regionInStore
            this.country = this.countryInStore
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped>
    /* .hero-body { border: 1px solid red;  } */

    .notification {
        /* border: 1px solid red; */
        margin-bottom: 10px;
    }
</style>
