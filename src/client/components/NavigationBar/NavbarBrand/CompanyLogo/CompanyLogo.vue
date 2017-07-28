<template>
    <a class="company-logo navbar-item"
       :href="hostUrl"
       :disabled="ajaxRequestPending">
        <img class="image"
             :src="logoUrl"
             alt="Company Logo"
             :width="logoWidth"
             :height="logoHeight">
    </a>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'company-logo',
        components: {},
        props: [],
        data: function () {
            return {
                hostUrl: `${this.$eVars.HOST}:${this.$eVars.PORT}`,
                logoUrl: `${this.$eVars.HOST}:${this.$eVars.PORT}/assets/images/gentryLogo.png`
            }
        },
        computed: {
            ...mapGetters({ ajaxRequestPending: 'ajaxRequestPending' }),
            logoWidth: function () {
                return this.isMobile ? 100 : 160
            },
            logoHeight: function () {
                return this.isMobile ? 25 : 40
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    a.company-logo {
        margin-top: auto;
        cursor: default;
        margin-bottom: auto;
    }

    a.company-logo[disabled],
    a.company-logo[disabled]:hover {
        pointer-events: none;
    }
</style>
