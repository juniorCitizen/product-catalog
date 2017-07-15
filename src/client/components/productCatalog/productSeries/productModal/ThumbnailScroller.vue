<template>
    <div class="level columns">
        <span class="column is-narrow">
            <i @click="scroll(-1)"
               class="fa fa-arrow-circle-left">
            </i>
        </span>
        <thumbnail-container :itemsOnDisplay="itemsOnDisplay"
                             :slideLeft="slideLeft"
                             :slideRight="slideRight"
                             @switchPhoto="switchPhoto($event)">
        </thumbnail-container>
        <span class="column is-narrow">
            <i @click="scroll(1)"
               class="fa fa-arrow-circle-right">
            </i>
        </span>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ThumbnailContainer from './ThumbnailContainer.vue'

    export default {
        name: 'thumbnail-scroller',
        components: { ThumbnailContainer },
        props: ['productPhotos'],
        data: function () {
            return {
                onDisplayItemCount: 6,
                currentIndex: 0,
                scrollLeft: 0,
                scrollRight: 0
            }
        },
        computed: {
            ...mapGetters({}),
            itemsOnDisplay: function () {
                if (
                    (this.productPhotos.length <= this.onDisplayItemCount) ||
                    (
                        (this.productPhotos.length > this.onDisplayItemCount) &&
                        (
                            (this.currentIndex + this.onDisplayItemCount) <= this.productPhotos.length
                        )
                    )
                ) {
                    return this.productPhotos.slice(this.currentIndex, this.currentIndex + this.onDisplayItemCount)
                } else {
                    let overRun = this.currentIndex + this.onDisplayItemCount - this.productPhotos.length
                    let tempArray = (this.productPhotos.slice(this.currentIndex)).concat(this.productPhotos.slice(0, overRun))
                    return tempArray
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            scroll: function (direction) {
                if (this.productPhotos.length > this.onDisplayItemCount) {
                    if (direction > 0) { // scroll left
                        // this.scrollLeft = 1
                        if (this.currentIndex < (this.productPhotos.length - 1)) {
                            this.currentIndex = this.currentIndex + 1
                        } else {
                            this.currentIndex = 0
                        }
                        // this.scrollLeft = 0
                    } else { // scroll right
                        // this.scrollRight = 1
                        if (this.currentIndex > 1) {
                            this.currentIndex = this.currentIndex - 1
                        } else {
                            this.currentIndex = this.productPhotos.length - 1
                        }
                        // this.scrollRight = 0
                    }
                }
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

    span {
        z-index: 1;
    }
</style>
