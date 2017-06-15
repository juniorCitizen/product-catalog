<template lang="html">
    <h1>Product Details</h1>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'productDetails',
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
