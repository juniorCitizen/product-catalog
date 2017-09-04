<template>
    <div class="control">
        <span class="select"
              :class="{'is-danger':warning}">
            <select :value="seriesId"
                    @change="updateValue">
                <option value="0"
                        disabled
                        selected>
                    產品系列 (必選)
                </option>
                <option v-for="seriesItem in series"
                        :key="seriesItem.id"
                        :value="seriesItem.id">
                    {{ seriesItem.reference }} 系列
                </option>
            </select>
        </span>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-series',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                series: 'series/data',
                seriesId: 'productData/form/seriesId',
                flowControl: 'flowControl/activated',
                validated: 'productData/form/validation/input',
                validating: 'productData/form/validation/state'
            }),
            warning: function () {
                return !this.validated('seriesId') && this.validating
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
                    name: 'seriesId',
                    value: parseInt(event.target.value)
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
