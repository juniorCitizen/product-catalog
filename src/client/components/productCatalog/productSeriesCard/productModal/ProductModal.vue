<template>
    <div class="modal"
         :class="{'is-active':modalActiveStatus}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head is-marginless">
                <div class="modal-card-title">
                    <div class="columns">
                        <span class="column">{{ product.itemCode }} {{ product.name }}</span>
                    </div>
                    <thumbnail-scroller :productPhotos="product.photos"
                                        @switchPhoto="switchPhoto($event)">
                    </thumbnail-scroller>
                </div>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-10">
                        <img :src="`${host}:${port}/${sysRef}/api/photos?photoId=${product.photos[photoIndex].id}`"
                             :alt="product.itemCode">
                    </div>
                    <div class="column"></div>
                </div>
                <product-specifications :product="product"></product-specifications>
            </section>
            <footer class="modal-card-foot">
                <a v-if="!isInterestedItem"
                   class="button is-success"
                   @click="itemSelection">
                    <b>I am interested in this item</b>
                </a>
                <a v-else
                   class="button is-success is-outlined"
                   @click="cancelItemSelection">
                    Not interested
                </a>
                <a class="button is-success"
                   @click="closeModal">Go back</a>
            </footer>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSpecifications from './ProductSpecifications.vue'
    import ThumbnailScroller from './ThumbnailScroller.vue'

    import eVars from '../../../../../server/config/environment'

    export default {
        name: 'product-modal',
        components: {
            ProductSpecifications,
            ThumbnailScroller
        },
        props: [
            'modalActiveStatus',
            'product',
            'isInterestedItem'
        ],
        data: function () {
            return {
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF,
                photoIndex: 0
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            closeModal: function () {
                this.$emit('closingModal')
            },
            cancelItemSelection: function () {
                this.$emit('cancelItemSelection')
            },
            itemSelection: function () {
                this.$emit('itemSelection')
            },
            switchPhoto: function ($event) {
                this.photoIndex = $event.photoIndex
            }
        }
    }
</script>

<style scoped></style>
