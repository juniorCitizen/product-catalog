<template>
    <div id="hello">
        <img src="http://vuejs.org/images/logo.png">
        <h1 class="abctitle">{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank">Forum</a>
            </li>
            <li>
                <a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
            </li>
            <li>
                <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
            </li>
            <li>
                <a href="https://github.com/vuejs/vueify" target="_blank">vueify</a>
            </li>
            <li>
                <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
            </li>
        </ul>
        <div class="row">
            <div class="large-6 columns"></div>
            <div class="large-5 large-offset-1 columns"></div>
            <a href="#" class="button expanded">test button</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data: () => {
        return {
            msg: 'Welcome to Your Vue.js App...'
        }
    },
    created: () => {
        console.log('this.msg')
    }
}
</script>

<style scoped lang="scss">
@import 'foundation.scss';
@import 'test.scss';

#hello {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.abctitle {
    font-size: 30px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
