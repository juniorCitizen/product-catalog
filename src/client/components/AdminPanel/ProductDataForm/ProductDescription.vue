<template>
    <div class="field">
        <div class="control">
            <textarea class="textarea"
                      placeholder="輸入產品敘述 (必填)"
                      :value="description"
                      @input="updateValue">
            </textarea>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-description',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                description: 'productData/form/description',
                flowControl: 'flowControl/activated',
                validated: 'productData/form/validation/input',
                validating: 'productData/form/validation/state'
            }),
            warning: function () {
                return !this.validated('description') && this.validating
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
                    name: 'description',
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
