<template>
    <div class="field">
        <div class="control">
            <input class="input"
                   type="text"
                   placeholder="輸入產品名稱 (必填)"
                   :value="name"
                   @input="updateValue">
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-name',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                name: 'productData/form/name',
                flowControl: 'flowControl/activated',
                validated: 'productData/form/validation/input',
                validating: 'productData/form/validation/state'
            }),
            warning: function () {
                return !this.validated('name') && this.validating
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
                    name: 'name',
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
