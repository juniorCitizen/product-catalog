<template>
    <div class="hero-body">
        <h6 class="notification is-info has-text-centered is-paddingless">
            <b>
                <i>REGISTER FOR OUR PDF CATALOG</i>
            </b>
        </h6>
        <company-field></company-field>
        <name-field></name-field>
        <email-field></email-field>
        <region-selector @regionSelected="regionSelectionEvent($event)">
        </region-selector>
        <country-selector @countrySelected="countrySelectionEvent($event)">
        </country-selector>
        <comments-field></comments-field>
        <submit-controls></submit-controls>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

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
                countryInStore: 'userCountry'
            })
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
                this.country = this.countries[0].name
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

<style scoped></style>
