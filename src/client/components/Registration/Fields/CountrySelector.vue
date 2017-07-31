<template>
    <div class="field">
        <div class="control has-icons-left">
            <div class="select"
                 :class="dynamicInputClass">
                <select v-model="country"
                        :disabled="ajaxRequestPending"
                        @change="emitCountrySelectionEvent">
                    <option v-for="country in filteredCountryList"
                            :key="country.name"
                            :value="country.name"
                            :disabled="country.name==='Country'">
                        {{ country.name }}
                    </option>
                </select>
            </div>
            <div class="icon is-left"
                 :class="dynamicIconClass">
                <img v-if="flagApiUrl!==null"
                     :width="flagSize"
                     :src="flagApiUrl">
                <i v-else
                   class="fa fa-question-circle"></i>
            </div>
            <p v-if="validationFailure"
               class="help is-danger">
                Let us know where you are from
            </p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'country-selector',
        components: {},
        props: [],
        data: function () {
            return {
                country: 'Country'
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                regions: 'regions',
                regionInStore: 'userRegion',
                countries: 'countries',
                filteredCountryList: 'filteredCountryList',
                countryInStore: 'userCountry',
                validationInEffect: 'validatingUserData'
            }),
            dynamicInputClass: function () {
                return {
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            },
            dynamicIconClass: function () {
                return {
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            },
            validationFailure: function () {
                return ((this.validationInEffect) && (this.countryInStore === 'Country'))
            },
            flagApiUrl: function () {
                if (this.countryInStore === this.countries[0].name) {
                    return null
                } else {
                    let alpha3Code = this.countries.filter((country) => {
                        return country.name === this.countryInStore
                    })[0].alpha3Code
                    return `${this.$eVars.HOST}:${this.$eVars.PORT}/${this.$eVars.SYS_REF}/api/countries/flags?country=${alpha3Code.toLowerCase()}`
                }
            },
            flagSize: function () {
                return this.isTouch ? '15px' : '30px'
            }
        },
        watch: {
            countryInStore: function (newStoreValue) {
                if (
                    (this.regionInStore === this.regions[0]) &&
                    (this.countryInStore === this.countries[0].name) &&
                    (newStoreValue !== this.region)
                ) {
                    this.country = this.countries[0].name
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            emitCountrySelectionEvent: function () {
                if (this.country === undefined) {
                    this.country = 'Country'
                }
                this.$emit('countrySelected', this.country)
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.country = this.countryInStore
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
