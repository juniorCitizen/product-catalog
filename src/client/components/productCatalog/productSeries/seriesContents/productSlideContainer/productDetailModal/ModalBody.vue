<template>
    <section class="modal-card-body">
        <div class="columns">
            <div class="column"></div>
            <div class="column is-10">
                <img :src="photoSource"
                     :alt="product.itemCode">
            </div>
            <div class="column"></div>
        </div>
        <product-specifications :product="product"></product-specifications>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSpecifications from './ProductSpecifications.vue'

    export default {
        name: 'modal-body',
        components: { ProductSpecifications },
        props: [
            'enlargedPhotoIndex',
            'product'
        ],
        data: function () {
            return {
                host: this.$eVars.HOST,
                port: this.$eVars.PORT,
                sysRef: this.$eVars.SYS_REF
            }
        },
        computed: {
            ...mapGetters({}),
            photoSource: function () {
                return `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.product.photos[this.enlargedPhotoIndex].id}`
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
