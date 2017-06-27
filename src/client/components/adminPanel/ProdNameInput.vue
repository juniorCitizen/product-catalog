<template>
    <div class="field">
        <p class="control">
            <input class="input"
                   type="text"
                   name="prod-serie"
                   v-model.lazy.trim="prodName"
                   @change="prodNameChanged"
                   placeholder="輸入產品名稱">
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'prod-name-input',
        components: {},
        props: ['masterProdName'],
        watch: {
            masterProdName: function (updatedMasterProdName) {
                if (updatedMasterProdName === null) {
                    this.prodName = null
                }
            }
        },
        data: function () {
            return {
                prodName: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            prodNameChanged: function () {
                if (this.prodName.length === 0) {
                    this.prodName = null
                }
                this.$emit('prodNameChanged', this.prodName)
            }
        }
    }
</script>

<style scoped></style>
