<template>
    <div class="field">
        <div class="control">
            <input class="input"
                   type="text"
                   placeholder="輸入產品編號 (必填)"
                   :value="code"
                   :disabled="!newEntry"
                   @input="updateValue">
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-code',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                code: 'productData/form/code',
                flowControl: 'flowControl/activated',
                validated: 'productData/form/validation/input',
                validating: 'productData/form/validation/state',
                newEntry: 'productData/newEntry'
            }),
            warning: function () {
                return !this.validated('code') && this.validating
            }
        },
        watch: {},
        methods: {
            ...mapMutations({
                register: 'productData/form/register'
            }),
            ...mapActions({}),
            updateValue: function (event) {
                this.register({
                    name: 'code',
                    value: event.target.value.trim()
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
