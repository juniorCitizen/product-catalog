<template>
    <p class="menu-label">
        <a v-if="typeof action === 'function'"
           @click="action()">{{ labelText }}
        </a>
        <span v-else>{{ labelText }}</span>
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'menu-label',
        components: {},
        props: [
            'labelText',
            'action'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
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
