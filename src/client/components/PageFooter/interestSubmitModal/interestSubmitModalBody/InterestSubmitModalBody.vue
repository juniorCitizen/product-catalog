<template>
    <section class="modal-card-body">
        <div class="message columns is-info">
            <span class="column notification box">
                <b>
                    Please complete the form below.
                    <br>Our staff will contact you about the products listed.
                </b>
            </span>
        </div>
        <br>
        <div class="columns">
            <div class="column is-narrow">
                <div class="columns">
                    <div class="column notification is-info has-text-centered box"
                         style="padding-top: 3px; padding-bottom: 3px;">
                        <b>Items of Interest</b>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <small v-for="productId in interestedItems"
                               :key="productId">
                            <div>{{ productLookupById(productId).itemCode }}</div>
                        </small>
                    </div>
                </div>
            </div>
            <submission-form></submission-form>
        </div>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import SubmissionForm from './submissionForm/SubmissionForm.vue'

    export default {
        name: 'interest-submit-modal-body',
        components: { SubmissionForm },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                productCatalogData: 'productCatalogData',
                interestedItems: 'interestedItems'
            }),
            uncategorizedProductData: function () {
                let uncategorizedProductData = []
                this.productCatalogData.forEach((productsBySeries) => {
                    if (productsBySeries.products.length > 0) {
                        uncategorizedProductData = uncategorizedProductData.concat(productsBySeries.products)
                    }
                })
                return uncategorizedProductData
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            productLookupById: function (productId) {
                let product = this.uncategorizedProductData.filter((product) => {
                    return product.id === productId
                })
                if (product.length > 0) {
                    return product[0]
                } else {
                    return null
                }
            }
        }
    }
</script>

<style scoped>
    section {
        border-radius: 5px;
    }

    tile {
        border: none;
    }

    textarea.item-display {
        height: 100vh;
    }
</style>
