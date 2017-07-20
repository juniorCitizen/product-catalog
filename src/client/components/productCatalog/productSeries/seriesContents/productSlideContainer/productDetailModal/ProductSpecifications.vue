<template>
    <article class="columns">
        <div class="column has-text-left">
            <div class="columns is-marginless is-paddingless">
                <h4 class="column title is-marginless is-paddingless">
                    Item Code:&nbsp;
                    <strong>{{ product.itemCode }}</strong>
                </h4>
            </div>
            <div class="columns is-marginless">
                <h4 class="column title is-marginless is-paddingless">
                    Product Name:&nbsp;
                    <strong>{{ product.name }}</strong>
                </h4>
            </div>
            <div class="columns">
                <div class="column">
                    <h4 class="title is-marginless is-paddingless">
                        Description:
                    </h4>
                    <p style="margin-top:10px;margin-left:20px;word-break:break-all;"
                       v-html="product.description.text.replace(/\n/g,'<br>')">
                    </p>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'product-specifications',
        components: {},
        props: ['product'],
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

<style scoped></style>
