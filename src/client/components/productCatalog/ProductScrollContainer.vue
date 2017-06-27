<template>
    <span class="column">
        <span class="columns">
            <img v-for="item in itemsOnDisplay"
                 :key="item"
                 class="column is-4"
                 :src="`${host}:${port}/${sysRef}/api/photos?photoId=${item.photos[0].id}`"
                 alt="test">
        </span>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import eVars from '../../../server/config/environment'

    export default {
        name: 'product-scroll-container',
        components: {},
        props: ['itemsOnDisplay'],
        data: function () {
            return {
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF
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

<style scoped></style>
