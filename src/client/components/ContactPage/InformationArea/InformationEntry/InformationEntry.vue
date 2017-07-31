<template>
    <div class="columns">
        <label-field :label="label"></label-field>
        <template v-if="dataIsString&&(label!=='Website')">
            <string-field :stringData="data"></string-field>
        </template>
        <template v-else-if="label==='Website'">
            <web-link-field :urlString="data"></web-link-field>
        </template>
        <template v-else-if="label==='Email'">
            <email-field :emailList="data"></email-field>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import LabelField from './LabelField/LabelField.vue'
    import StringField from './DataField/StringField.vue'
    import WebLinkField from './DataField/WebLinkField.vue'
    import EmailField from './DataField/EmailField.vue'

    export default {
        name: 'information-entry',
        components: {
            LabelField,
            StringField,
            WebLinkField,
            EmailField
        },
        props: [
            'label',
            'data'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            dataIsString: function () {
                return ((typeof this.data) === 'string')
            }
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({})
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
