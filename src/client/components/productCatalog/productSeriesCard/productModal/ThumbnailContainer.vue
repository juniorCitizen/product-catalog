<template>
    <span class="column columns is-marginless is-paddingless">
        <thumbnail-slide v-for="(productPhoto, photoIndex) in itemsOnDisplay"
                         :key="photoIndex"
                         :photoIndex="photoIndex"
                         :productPhoto="productPhoto"
                         @switchPhoto="switchPhoto($event)">
        </thumbnail-slide>
        </div>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ThumbnailSlide from './ThumbnailSlide.vue'

    export default {
        name: 'thumnail-container',
        components: { ThumbnailSlide },
        props: ['itemsOnDisplay'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            switchPhoto: function ($event) {
                this.$emit('switchPhoto', {
                    photoId: $event.photoId,
                    photoIndex: $event.photoIndex
                })
            }
        }
    }
</script>

<style scoped></style>
