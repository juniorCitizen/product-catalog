<template>
    <div class="hero-body tile is-parent">
        <office-info :offices="offices"
                     :staff="staff">
        </office-info>
        <registration-form></registration-form>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import OfficeInfo from './OfficeInfo.vue'
    import RegistrationForm from './RegistrationForm.vue'

    export default {
        name: 'contact-page',
        components: { OfficeInfo, RegistrationForm },
        data: function () {
            return {
                offices: [{
                    title: 'Taiwan Location',
                    companyName: 'Gentry Way Co., Ltd.',
                    address: 'No. 152, Wufu Road',
                    town: 'Yanshui District',
                    city: 'Tainan City',
                    state: null,
                    country: 'Taiwan R.O.C.',
                    telephone: '+886-(0)6-6529052',
                    fax: '+886-(0)6-6527093',
                    website: `${this.$eVars.HOST}:${this.$eVars.PORT}`
                }, {
                    title: 'China Location',
                    companyName: 'Gentry Hardware Product Co., Ltd.',
                    address: 'No. 158, Dong Cheng Road',
                    town: 'Dong Sheng Town',
                    city: 'Zhong Shan City',
                    state: 'Guangdong Province',
                    country: 'China',
                    telephone: '+86-760-22229026 ~ 28',
                    fax: '+86-760-22820916',
                    website: `${this.$eVars.HOST}:${this.$eVars.PORT}`
                }],
                staff: [{
                    country: 'Taiwan R.O.C.',
                    name: 'General Service',
                    email: 'gentry88@ms46.hinet.net'
                }, {
                    country: 'Taiwan R.O.C.',
                    name: 'David Tsai',
                    email: 'david.tsai@gentry-way.com.tw'
                }, {
                    country: 'Taiwan R.O.C.',
                    name: 'Cathy Liu',
                    email: 'cathy.liu@gentry-way.com.tw'
                }, {
                    country: 'Taiwan R.O.C.',
                    name: 'Candy Wu',
                    email: 'candy.wu@gentry-way.com.tw'
                }, {
                    country: 'China',
                    name: 'General Service',
                    email: 'gentry@vip.163.com'
                }, {
                    country: 'China',
                    name: 'Johnson Wu',
                    email: 'altecqc@msn.com'
                }]
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

<style scoped>
    .tile {
        border: none;
    }
</style>
