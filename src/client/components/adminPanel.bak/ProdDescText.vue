<template>
    <div class="field">
        <p class="control">
            <textarea class="textarea"
                      name="prod-desc"
                      v-model.lazy.trim="prodDesc"
                      @change="prodDescChanged"
                      placeholder="輸入產品敘述"></textarea>
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'prod-desc-text',
        components: {},
        props: ['masterProdDesc'],
        watch: {
            masterProdDesc: function (updatedMasterProdDesc) {
                this.prodDesc = updatedMasterProdDesc
                if (updatedMasterProdDesc === null) {
                    this.prodDesc = null
                }
            }
        },
        data: function () {
            return {
                prodDesc: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            prodDescChanged: function () {
                if (this.prodDesc.length === 0) {
                    this.prodDesc = null
                }
                this.$emit('prodDescChanged', this.prodDesc)
            }
        }
    }
</script>

<style scoped></style>
