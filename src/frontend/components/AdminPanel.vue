<template lang="html">
    <h1>Admin Panel</h1>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'adminPanel',
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
