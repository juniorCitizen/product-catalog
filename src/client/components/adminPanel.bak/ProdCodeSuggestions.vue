<template>
    <select size="5"
            v-model="selected">
        <option v-for="(suggestion,index) in suggestions"
                :key="index"
                :value="suggestion.itemCode">
            {{ suggestion.itemCode }} - {{ suggestion.name }}
        </option>
    </select>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'prod-code-suggestions',
        components: {},
        props: ['suggestions'],
        watch: {
            selected: function (selectedItem) {
                this.$emit('suggestionSelected', selectedItem)
            }
        },
        data: function () {
            return {
                selected: ''
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    select {
        border-radius: 3px;
        position: absolute;
        z-index: 1;
        background-color: white;
        margin-top: 5px;
        overflow-y: hidden;
    }

    option {
        padding: 5px;
    }

    option:hover {
        background-color: darkseagreen;
    }
</style>
