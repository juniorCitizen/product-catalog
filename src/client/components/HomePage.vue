<template>
    <div class="hero-body"
         style="position: relative;">
        <div class="container has-text-centered">
            <h1 class="title is-1 is-spaced">
                <strong class="content">
                    <i>Gentry Way Co., Ltd. &</i>
                </strong>
                <br>
                <strong class="content">
                    <i>Gentry Hardware Product Co., Ltd.</i>
                </strong>
            </h1>
            <h3 class="motto subtitle is-3">
                <i>Quality aluminium extrusion articles</i>
                <br>
                <i>for medical, rehabilitation and recreation industries</i>
                <br>
                <i>at competitive prices !!!</i>
                <br>
                <br>
                <h4 class="subtitle is-4">
                    <i>Products available from Taiwan or China</i>
                </h4>
            </h3>
        </div>
        <router-link class="button is-success is-outlined"
                     to="/products">
            <b>
                <i>CLICK TO SEE OUR PRODUCTS</i>
            </b>
        </router-link>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'home-page',
        components: {},
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        mounted: function () { }
    }
</script>

<style scoped>
    .title {
        transform: rotate(-4deg) scale(1.2, 1.6) translate(0px, -50px);
        color: darkgreen;
    }

    .motto {
        overflow: visible;
        transform: rotate(-4deg) translate(0px, -50px);
    }

    .button {
        transform: scale(2, 2);
        position: absolute;
        bottom: -40px;
        width: 100%;
        border: none;
    }

    div.hero-body {
        animation: animate 2s both;
    }

    div.container {
        transform: translate(20px);
    }

    @keyframes animate {
        0% {
            transform: scale(0.6);
        }
        100% {
            transform: scale(0.8);
        }
    }
</style>
