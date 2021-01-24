<template>
    <div id="app">
        <main-header></main-header>
        <router-view></router-view>
        <vue-metamask :userMessage="msg" @onComplete="onComplete"></vue-metamask>
        <vue-snotify></vue-snotify>
    </div>
</template>

<script lang="ts">
    import MainHeader from './layout/header/MainHeader.vue';
    import {Action} from 'vuex-class';
    import Web3 from 'web3';
    import {Component, Vue} from 'vue-property-decorator';
    import VueMetamask from 'vue-metamask';


    @Component({
        components: {
            MainHeader,
            VueMetamask
        }
    })
    export default class App extends Vue {

        @Action('initStore')
        initStore!: (web3: Web3) => void;

        msg = "This is demo net work";

        onComplete(data: any) {
            const web3 = new Web3(data.web3.currentProvider);
            web3.eth.defaultAccount = data.web3.eth.accounts[0];
            web3.eth.accounts = data.web3.eth.accounts;
            this.initStore(web3);
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
