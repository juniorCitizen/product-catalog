<template lang="html">
    <h1>Home Page</h1>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'homePage',
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
