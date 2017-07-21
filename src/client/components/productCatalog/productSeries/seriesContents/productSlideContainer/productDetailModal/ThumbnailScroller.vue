<template>
    <div class="level columns">
        <div class="column is-narrow">
            <i class="fa fa-arrow-circle-left"
               @click="activateSlideRight">
            </i>
        </div>
        <thumbnail-slide-container :productPhotos="productPhotos"
                                   :enlargedPhotoIndex="enlargedPhotoIndex"
                                   :displayCount="displayCount"
                                   :slideLeft="slideLeft"
                                   :slideRight="slideRight"
                                   @slidingAnimationCompleted="resetSlideAnimationFlags"
                                   @switchPhoto="switchPhoto($event)">
        </thumbnail-slide-container>
        <div class="column is-narrow">
            <i class="fa fa-arrow-circle-right"
               @click="activateSlideLeft">
            </i>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ThumbnailSlideContainer from './ThumbnailSlideContainer.vue'

    export default {
        name: 'thumbnail-scroller',
        components: { ThumbnailSlideContainer },
        props: [
            'enlargedPhotoIndex',
            'productPhotos'
        ],
        data: function () {
            return {
                displayCount: 6, // possible value 3, 4, 6
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
                if (!this.slideLeft && !this.slideRight && (this.displayCount < this.productPhotos.length)) {
                    this.slideLeft = true
                }
            },
            activateSlideRight: function () {
                if (!this.slideLeft && !this.slideRight && (this.displayCount < this.productPhotos.length)) {
                    this.slideRight = true
                }
            },
            resetSlideAnimationFlags: function () {
                this.slideLeft = false
                this.slideRight = false
            },
            switchPhoto: function ($event) {
                this.$emit('switchPhoto', $event)
            }
        }
    }
</script>

<style scoped>
    i.fa {
        color: #126534;
    }

    div.level {
        border: none;
    }

    div.column.is-narrow {
        border: none;
    }
</style>
