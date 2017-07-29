<template>
    <div class="hero-body tile is-parent">
        <registration-form></registration-form>
        <office-info :offices="officeLocationData"
                     :staff="staffData">
        </office-info>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import RegistrationForm from './RegistrationForm/RegistrationForm.vue'
    import ContactInfoControl from './ContactInfo/ContactInfo.vue'

    export default {
        name: 'contact-page',
        components: {
            RegistrationForm,
            ContactInfoControl
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                officeLocationData: 'officeLocationData',
                staffData: 'staffData'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    .tile {
        border: none;
    }
</style>
