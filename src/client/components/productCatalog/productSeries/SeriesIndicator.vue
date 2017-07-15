<template>
    <span class="card-header-icon">
        <span class="icon">
            <i v-show="!activeItem"
               class="fa fa-angle-down"></i>
            <i v-show="activeItem"
               class="fa fa-angle-up"></i>
        </span>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'series-indicator',
        components: {},
        props: ['activeItem'],
        data: function () {
            return {}
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

<style scoped></style>
