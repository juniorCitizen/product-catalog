<template>
    <span class="column columns is-marginless is-paddingless">
        <primary-image-slide v-for="(product, index) in itemsOnDisplay"
                             :key="index"
                             :product="product">
        </primary-image-slide>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import PrimaryImageSlide from './PrimaryImageSlide.vue'

    export default {
        name: 'primary-image-container',
        components: { PrimaryImageSlide },
        props: ['itemsOnDisplay'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
