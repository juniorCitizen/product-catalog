<template>
    <div class="box">
        <div class="title notification box is-4">
            <span>新建產品資料</span>
        </div>
        <submission></submission>
        <div class="field is-grouped">
            <product-series></product-series>
            <product-type></product-type>
        </div>
        <product-code></product-code>
        <product-name></product-name>
        <product-description></product-description>
        <primary-photo></primary-photo>
        <primary-photo-display v-if="primaryPhoto!==null">
        </primary-photo-display>
        <secondary-photos></secondary-photos>
        <secondary-photo-display v-if="secondaryPhotos!==null">
        </secondary-photo-display>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import Submission from './Submission/Submission.vue'
    import ProductSeries from './ProductSeries.vue'
    import ProductType from './ProductType.vue'
    import ProductCode from './ProductCode.vue'
    import ProductName from './ProductName.vue'
    import ProductDescription from './ProductDescription.vue'
    import PrimaryPhoto from './PhotoUploads/PrimaryPhoto.vue'
    import PrimaryPhotoDisplay from './PhotoUploads/PrimaryPhotoDisplay.vue'
    import SecondaryPhotos from './PhotoUploads/SecondaryPhotos.vue'
    import SecondaryPhotoDisplay from './PhotoUploads/SecondaryPhotoDisplay.vue'

    export default {
        name: 'product-data-form',
        components: {
            Submission,
            ProductSeries,
            ProductType,
            ProductCode,
            ProductName,
            ProductDescription,
            PrimaryPhoto,
            PrimaryPhotoDisplay,
            SecondaryPhotos,
            SecondaryPhotoDisplay
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                primaryPhoto: 'productData/form/primaryPhoto',
                secondaryPhotos: 'productData/form/secondaryPhotos'
            })
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
