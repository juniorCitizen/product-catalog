<template lang="html">
    <h1>Product Catalog</h1>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'productCatalog',
    components: {},
    data: () => {
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

<style scoped lang="scss">

</style>
