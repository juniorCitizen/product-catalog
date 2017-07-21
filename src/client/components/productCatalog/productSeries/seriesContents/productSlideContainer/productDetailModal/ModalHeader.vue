<template>
    <header class="modal-card-head is-marginless">
        <div class="modal-card-title">
            <div class="columns">
                <span class="column">
                    {{ product.itemCode }} {{ product.name }}
                </span>
            </div>
            <thumbnail-scroller :enlargedPhotoIndex="enlargedPhotoIndex"
                                :productPhotos="product.photos"
                                @switchPhoto="switchPhoto($event)">
            </thumbnail-scroller>
        </div>
    </header>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import ThumbnailScroller from './ThumbnailScroller.vue'

    export default {
        name: 'modal-header',
        components: { ThumbnailScroller },
        props: [
            'enlargedPhotoIndex',
            'product'
        ],
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
                this.$emit('switchPhoto', $event)
            }
        }
    }
</script>

<style scoped>
    header.modal-card-head {
        border: none;
    }

    div.modal-card-title {
        border: none;
    }
</style>
