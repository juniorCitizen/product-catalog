<template>
    <div class="field">
        <div class="control has-icons-left">
            <div class="select"
                 :class="dynamicInputClass">
                <select v-model="region"
                        :disabled="ajaxRequestPending"
                        @change="$emit('regionSelected',region)">
                    <option v-for="region in regions"
                            :key="region"
                            :value="region"
                            :disabled="region==='All Regions'">
                        {{ region }}
                    </option>
                </select>
            </div>
            <div class="icon is-left"
                 :class="dynamicIconClass">
                <i class="fa fa-globe"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'region-selector',
        components: {},
        props: [],
        data: function () {
            return {
                region: 'All Regions'
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending', // pending deprecation
                regions: 'regions',
                regionInStore: 'userRegion',
                countries: 'countries',
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
            }
        },
        watch: {
            regionInStore: function (newStoreValue) {
                if (
                    (this.regionInStore === this.regions[0]) &&
                    (this.countryInStore === this.countries[0].name) &&
                    (newStoreValue !== this.region)
                ) {
                    this.region = this.regions[0]
                }
            }
        },
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
