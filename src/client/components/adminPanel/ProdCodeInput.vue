<template>
    <div class="field"
         style="position: relative;">
        <p class="control">
            <input class="input"
                   type="text"
                   name="prod-serie"
                   v-model.trim="prodCode"
                   placeholder="輸入產品編號">
        </p>
        <prod-code-suggestions v-show="suggestionAvailable"
                               :suggestions="suggestions"
                               @suggestionSelected="itemCodeUpdated($event)">
        </prod-code-suggestions>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import eVars from '../../../server/config/environment'
    import ProdCodeSuggestions from './ProdCodeSuggestions.vue'

    export default {
        name: 'prod-code-input',
        components: { ProdCodeSuggestions },
        props: ['masterProdCode', 'masterSelectedSerie'],
        watch: {
            masterProdCode: function (updatedMasterProdCode) {
                this.prodCode = updatedMasterProdCode
                if (updatedMasterProdCode === null) {
                    this.suggestions = []
                }
            },
            prodCode: function (newItemCode) {
                if (newItemCode === '') {
                    this.prodCode = null
                    this.suggestions = []
                    this.$emit('itemCodeChanged', null)
                } else {
                    this.prodCode = newItemCode
                    this.$emit('itemCodeChanged', newItemCode)
                }
                if (this.readyToSuggest) {
                    let url = `${eVars.HOST}:${eVars.PORT}/${eVars.SYS_REF}/api/products/productCodes`
                    let queryString = `?serieId=${this.masterSelectedSerie}&itemCode=${newItemCode}`
                    let axiosOptions = {
                        method: 'get',
                        url: url + queryString
                    }
                    axios(axiosOptions)
                        .then((serverResponse) => {
                            if (serverResponse.data.data === null) {
                                this.suggestions = []
                            } else {
                                this.suggestions = serverResponse.data.data
                            }
                        })
                        .catch((error) => {
                            this.suggestions = []
                            console.log(error)
                        })
                }
            }
        },
        data: function () {
            return {
                prodCode: null,
                suggestions: []
            }
        },
        computed: {
            ...mapGetters({}),
            readyToSuggest: function () {
                return (this.masterSelectedSerie > 0) && (this.prodCode !== null) && (this.prodCode !== '')
            },
            suggestionAvailable: function () {
                return this.suggestions.length > 0
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            itemCodeUpdated: function (newItemCode) {
                this.prodCode = newItemCode
                this.$emit('itemCodeChanged', newItemCode)
                this.suggestions = this.suggestions.filter((suggestion) => {
                    return suggestion.itemCode === newItemCode
                })
            }
        }
    }
</script>

<style scoped></style>
