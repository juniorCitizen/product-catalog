<template lang="html">
    <span>newTemplate</span>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'newTemplate',
    components: {},
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
