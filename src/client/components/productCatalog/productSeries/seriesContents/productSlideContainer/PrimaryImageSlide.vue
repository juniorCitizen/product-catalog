<template>
    <div class="column is-3">
        <div class="image-container is-marginless">
            <a class="interest-mark">
                <i v-if="!isInterestedItem"
                   class="fa fa-check-circle-o fa-2x"
                   style="color: gray;"
                   @click="selectInterestedItem">
                </i>
                <i v-else
                   class="fa fa-check-circle fa-2x"
                   style="color: green;"
                   @click="deselectUninterestedItem">
                </i>
            </a>
            <a @click="callProductModal">
                <img class="image"
                     :src="`${host}:${port}/${sysRef}/api/photos?photoId=${product.photos[0].id}`"
                     :alt="product.itemCode">
            </a>
            <h2>
                <span>{{ product.itemCode }}</span>
            </h2>
            <product-detail-modal :modalActiveStatus="modalActiveStatus"
                                  :product="product"
                                  :isInterestedItem="isInterestedItem"
                                  @closingModal="callProductModal"
                                  @itemSelection="selectInterestedItem"
                                  @cancelItemSelection="deselectUninterestedItem">
            </product-detail-modal>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductDetailModal from './productDetailModal/ProductDetailModal.vue'

    import eVars from '../../../../../../server/config/environment'

    export default {
        name: 'primary-image-slide',
        components: { ProductDetailModal },
        props: ['product'],
        data: function () {
            return {
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF,
                modalActiveStatus: false
            }
        },
        computed: {
            ...mapGetters({
                interestedItems: 'interestedItems'
            }),
            isInterestedItem: function () {
                return (this.interestedItems.indexOf(this.product.id) !== -1)
            }
        },
        methods: {
            ...mapMutations({
                addItemOfInterest: 'addItemOfInterest',
                removeItemOfInterest: 'removeItemOfInterest'
            }),
            ...mapActions({}),
            callProductModal: function () {
                this.modalActiveStatus = !this.modalActiveStatus
            },
            selectInterestedItem: function () {
                this.addItemOfInterest(this.product.id)
                this.modalActiveStatus = false
            },
            deselectUninterestedItem: function () {
                this.removeItemOfInterest(this.product.id)
                this.modalActiveStatus = false
            }
        }
    }
</script>

<style scoped>
    .image-container {
        position: relative;
        border: none;
        border-radius: 10px;
    }

    img.image {
        height: 150px;
        margin: 3px;
        border: none;
        border-radius: 12px;
        transition: transform 0.6s;
    }

    img.image:hover {
        transform: scale(1.05);
    }

    h2 {
        position: absolute;
        bottom: 5px;
        left: 5px;
        margin: 0px;
    }

    h2 span {
        color: white;
        font: italic 14px/25px Helvetica, Sans-Serif;
        padding: 5px;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.3);
    }

    .product-name {
        color: white;
        font-weight: bolder;
        padding: 5px 5px 5px 0px;
    }

    .interest-mark {
        position: absolute;
        top: 3%;
        right: 1%;
        z-index: 1;
        padding: 3px;
    }
</style>
