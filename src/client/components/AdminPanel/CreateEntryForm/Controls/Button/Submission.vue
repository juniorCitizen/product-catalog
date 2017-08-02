<template>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-info"
                    :disabled="!readyToSubmit"
                    @click="submitProductData(masterDataSet)">
                建立資料
            </button>
        </p>
        <p class="control">
            <button class="button is-info"
                    @click="$emit('clearForm')">
                清除表單
            </button>
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'submission',
        components: {},
        props: [
            'masterDataSet',
            'readyToSubmit'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({
                fetchProductCatalogData: 'fetchProductCatalogData',
                submitProductDataAction: 'submitProductData'
            }),
            submitProductData(masterDataSet) {
                this.submitProductDataAction(masterDataSet)
                    .then((apiResponse) => {
                        console.log(apiResponse.data)
                        this.$emit('clearForm')
                        this.fetchProductCatalogData()
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$emit('clearForm')
                    })
            }
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
