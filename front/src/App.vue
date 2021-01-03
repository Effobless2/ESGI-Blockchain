<template>
  <div id="app">
    <main-header></main-header>
    <button v-on:click="AddElection">AddElection</button>
    <p>{{ elections }}</p>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainHeader from './layout/header/MainHeader.vue';
import { mapActions } from 'vuex';
import { Action, State } from 'vuex-class';
import Election from './models/Election';
import Web3 from 'web3';

@Component({
  components : {
    MainHeader
  }
})
export default class App extends Vue {

  @State('elections')
  elections!: Election[];

  @Action('initStore')
  initStore!: (web3: Web3) => void;

  @Action('addElection')
  addElection!: (data: {electionName: string, candidateNames: string[] }) => Promise<Election> | undefined;

  mounted() {
    //TODO: Change this shit with Metamask Account
    const provider = new Web3.providers.HttpProvider('http://localhost:7545');
    const web3 = new Web3(provider);
    web3.eth.defaultAccount = "0xCa8DBb32e202E08CDf8E1d8Fb13e8862A92d3043";

    this.initStore(web3);
  }

  async AddElection() {
    const result = await this.addElection({electionName: "Mon Sondage Front", candidateNames: ["Vue", "Angular", "React.POOP"]});
    console.log(result);
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
