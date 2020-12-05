<template>
  <div id="app">
    <main-header></main-header>
    <router-view></router-view>
    <vue-metamask :userMessage="msg" @onComplete="onComplete"></vue-metamask>
  </div>
</template>

<script lang="ts">
import MainHeader from './layout/header/MainHeader.vue';
import { Action } from 'vuex-class';
import Election from './models/Election';
import Web3 from 'web3';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueMetamask from 'vue-metamask';

@Component({
  components : {
    MainHeader,
    VueMetamask
  }
})
export default class App extends Vue {

  @Action('initStore')
  initStore!: (web3: Web3) => void;

  mounted() {
    //TODO: Change this shit with Metamask Account
    const provider = new Web3.providers.HttpProvider('http://localhost:7545');
    const web3 = new Web3(provider);
    web3.eth.defaultAccount = "0xCa8DBb32e202E08CDf8E1d8Fb13e8862A92d3043";

    this.initStore(web3);
  }

  msg = "This is demo net work";

  onComplete(data: any){
    console.log('data:', data);
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
