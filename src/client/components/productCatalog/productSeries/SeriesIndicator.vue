<template>
    <span class="card-header-icon"
          :class="{'is-active':activeItem, 'is-inactive':!activeItem}">
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

<style lang="sass" scoped>
    @keyframes activate {
        0% {
            margin: 5px 12px 5px 0px;
            padding: 0px 0px 0px 0px;
        }
        100% {
            margin: 15px 0px 15px 0px;
        }
    }

    @keyframes deactivate {
        0% {
            margin: 15px 0px 15px 0px;
        }
        100% {
            margin: 5px 12px 5px 0px;
            padding: 0px 0px 0px 0px;
        }
    }

    span.card-header-icon.is-active {
        animation: activate 0.3s both;
    }

    span.card-header-icon.is-inactive {
        animation: deactivate 0.3s both;
    }
</style>
