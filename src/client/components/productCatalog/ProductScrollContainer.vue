<template>
    <span class="column">
        <span class="columns">
            <image-slide v-for="product in itemsOnDisplay"
                         :key="product"
                         :product="product">
            </image-slide>
        </span>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ImageSlide from './ImageSlide.vue'

    export default {
        name: 'product-scroll-container',
        components: { ImageSlide },
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
