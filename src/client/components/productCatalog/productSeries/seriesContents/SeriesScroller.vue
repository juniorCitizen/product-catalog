<template>
    <div class="content">
        <div class="level columns">
            <div class="column is-narrow">
                <i class="fa fa-arrow-circle-left fa-3x"
                   @click="activateSlideRight">
                </i>
            </div>
            <product-slide-container :products="products"
                                     :slideLeft="slideLeft"
                                     :slideRight="slideRight"
                                     @slidingAnimationCompleted="resetSlideAnimationFlags">
            </product-slide-container>
            <div class="column is-narrow">
                <i class="fa fa-arrow-circle-right fa-3x"
                   @click="activateSlideLeft">
                </i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSlideContainer from './productSlideContainer/ProductSlideContainer.vue'

    export default {
        name: 'series-scroller',
        components: { ProductSlideContainer },
        props: ['products'],
        data: function () {
            return {
                slideLeft: false,
                slideRight: false
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            activateSlideLeft: function () {
                if (!this.slideLeft && !this.slideRight) {
                    this.slideLeft = true
                }
            },
            activateSlideRight: function () {
                if (!this.slideLeft && !this.slideRight) {
                    this.slideRight = true
                }
            },
            resetSlideAnimationFlags: function () {
                this.slideLeft = false
                this.slideRight = false
            }
        }
    }
</script>

<style scoped>
    i.fa {
        color: #126534;
    }
</style>
