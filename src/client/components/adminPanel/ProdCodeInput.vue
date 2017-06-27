<template>
    <div class="field">
        <p class="control">
            <input class="input"
                   type="text"
                   name="prod-serie"
                   v-model.lazy.trim="prodCode"
                   @change="prodCodeChanged"
                   placeholder="輸入產品編號">
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'prod-code-input',
        components: {},
        props: ['masterProdCode'],
        watch: {
            masterProdCode: function (updatedMasterProdCode) {
                if (updatedMasterProdCode === null) {
                    this.prodCode = null
                }
            }
        },
        data: function () {
            return {
                prodCode: null
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            prodCodeChanged: function () {
                if (this.prodCode.length === 0) {
                    this.prodCode = null
                }
                this.$emit('prodCodeChanged', this.prodCode)
            }
        }
    }
</script>

<style scoped></style>
