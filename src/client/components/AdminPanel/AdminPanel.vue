<template>
    <v-layout row>
        <v-flex hidden-xs-only></v-flex>
        <v-flex xs12
                sm10
                md8
                lg6>
            <span v-if="jwt">Admin Panel</span>
            <login-form v-else></login-form>
        </v-flex>
        <v-flex hidden-xs-only></v-flex>
    </v-layout>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import LoginForm from './LoginForm.vue'

    export default {
        name: 'admin-panel',
        components: { LoginForm },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                jwt: 'jwt'
            })
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
