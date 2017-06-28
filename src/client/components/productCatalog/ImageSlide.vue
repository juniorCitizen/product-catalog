<template>
    <div class="image-slide column is-4">
        <a class="interest-mark">
            <i v-if="true"
               class="fa fa-check-circle-o fa-2x"
               style="color: gray;"></i>
            <i v-else
               class="fa fa-check-circle fa-2x"
               style="color: green;"></i>
        </a>
        <a @click="callProductModal(product.id)">
            <img class="image"
                 style="height:150px;"
                 :src="`${host}:${port}/${sysRef}/api/photos?photoId=${product.photos[0].id}`"
                 :alt="product.itemCode">
        </a>
        <span class="tooltip-text has-text-left">
            <h6 class="product-name title is-6 has-text-left is-marginless">{{ product.name }}</h6>
            <span class="product-description"
                  v-html="product.description.text.replace(/\n/g, '<br>')"></span>
        </span>
        <h2>
            <span>
                Item No. {{ product.itemCode }}
            </span>
        </h2>
        <product-modal :modalActiveStatus="modalActiveStatus"></product-modal>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductModal from './productModal.vue'

    import eVars from '../../../server/config/environment'

    export default {
        name: 'image-slide',
        components: { ProductModal },
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
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            callProductModal: function (productId) {
                this.modalActiveStatus = !this.modalActiveStatus
            }
        }
    }
</script>

<style scoped>
    .image-slide {
        position: relative;
        background: cover;
    }

    h2 {
        position: absolute;
        bottom: 20px;
        margin: 0px;
    }

    h2 span {
        color: white;
        font: bold italic 14px/25px Helvetica, Sans-Serif;
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
        top: 5px;
        right: 5px;
        z-index: 1;
        padding: 3px;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.3);
    }

    .image-slide .tooltip-text {
        position: absolute;
        width: 250px;
        top: 100%;
        left: 20%;
        visibility: hidden;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.6);
        font: 10px/25px Helvetica, Sans-Serif;
        color: #fff;
        padding: 5px;
        border-radius: 6px;
        z-index: 1;
    }

    .image-slide:hover .tooltip-text {
        visibility: visible;
    }
</style>
