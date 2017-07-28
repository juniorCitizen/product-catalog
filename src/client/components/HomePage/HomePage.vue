<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <companyTitle></companyTitle>
            <br v-if="isLargeAndUp || isMediumAndUp">
            <br v-if="isLargeAndUp">
            <motto-text></motto-text>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import MottoText from './MottoText/MottoText.vue'
    import CompanyTitle from './CompanyTitle/CompanyTitle.vue'

    export default {
        name: 'home-page',
        components: {
            CompanyTitle,
            MottoText
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        mounted: function () { }
    }
</script>

<style scoped>
    div.hero-body {
        animation: animate 0.8s both;
    }

    @keyframes animate {
        0% {
            transform: scale(0.6);
        }
        100% {
            transform: scale(0.8);
        }
    }
</style>
