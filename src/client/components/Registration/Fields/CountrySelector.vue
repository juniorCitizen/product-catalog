<template>
    <div class="field">
        <div class="control has-icons-left">
            <div class="select"
                 :class="dynamicInputClass">
                <select v-model="country"
                        :disabled="ajaxRequestPending"
                        @change="emitCountrySelectionEvent">
                    <option v-for="country in countries"
                            :key="country.name"
                            :value="country.name"
                            :disabled="country.name==='Country'">
                        {{ country.name }}
                    </option>
                </select>
            </div>
            <div class="icon is-left"
                 :class="dynamicIconClass">
                <i class="fa fa-globe"></i>
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
                ajaxRequestPending: 'ajaxRequestPending', // pending deprecation
                regions: 'regions',
                regionInStore: 'userRegion',
                countries: 'filteredCountryList',
                countryInStore: 'userCountry'
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
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
