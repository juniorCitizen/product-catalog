<template>
    <div class="content">
        <div class="level columns">
            <span class="column is-narrow">
                <i @click="scroll(-1)"
                   class="fa fa-arrow-circle-left fa-3x">
                </i>
            </span>
            <primary-image-container :itemsOnDisplay="itemsOnDisplay"></primary-image-container>
            <span class="column is-narrow">
                <i @click="scroll(1)"
                   class="fa fa-arrow-circle-right fa-3x">
                </i>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import PrimaryImageContainer from './PrimaryImageContainer.vue'

    export default {
        name: 'product-scroller',
        components: { PrimaryImageContainer },
        props: ['products'],
        data: function () {
            return {
                onDisplayItemCount: 4,
                currentIndex: 0
            }
        },
        computed: {
            ...mapGetters({}),
            itemsOnDisplay: function () {
                if (
                    (this.products.length <= this.onDisplayItemCount) ||
                    (
                        (this.products.length > this.onDisplayItemCount) &&
                        (
                            (this.currentIndex + this.onDisplayItemCount) <= this.products.length
                        )
                    )
                ) {
                    return this.products.slice(this.currentIndex, this.currentIndex + this.onDisplayItemCount)
                } else {
                    let overRun = this.currentIndex + this.onDisplayItemCount - this.products.length
                    let tempArray = (this.products.slice(this.currentIndex)).concat(this.products.slice(0, overRun))
                    return tempArray
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            scroll: function (direction) {
                if (this.products.length > this.onDisplayItemCount) {
                    if (direction > 0) {
                        if (this.currentIndex < (this.products.length - 1)) {
                            this.currentIndex = this.currentIndex + 1
                        } else {
                            this.currentIndex = 0
                        }
                    } else {
                        if (this.currentIndex > 1) {
                            this.currentIndex = this.currentIndex - 1
                        } else {
                            this.currentIndex = this.products.length - 1
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    i.fa {
        color: #126534;
    }
</style>
