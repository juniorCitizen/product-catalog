<template>
    <img :src="flagImageUrl">
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'flag-image',
        components: {},
        props: ['country'],
        data: function () {
            return {
                apiUrlPrefix: `${this.$eVars.HOST}:${this.$eVars.PORT}/${this.$eVars.SYS_REF}`
            }
        },
        computed: {
            ...mapGetters({ countries: 'countries' }),
            flagImageUrl: function () {
                let countryFilterResult = this.countries.filter((country) => {
                    return country.name === this.country
                })
                if (countryFilterResult[0]) {
                    return `${this.apiUrlPrefix}/api/countries/flags?country=${countryFilterResult[0].alpha3Code.toLowerCase()}`
                } else {
                    return null
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
