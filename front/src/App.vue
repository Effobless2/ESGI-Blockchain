<template>
  <div id="app">
    <main-header></main-header>
    <p>{{ elections }}</p>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainHeader from './layout/header/MainHeader.vue';
import { mapActions } from 'vuex';
import { Action, State } from 'vuex-class';
import Elections from './models/Election';


@Component({
  components : {
    MainHeader
  }
})
export default class App extends Vue {
  @Action('setElections')
  setElections!: (newElections: Elections[]) => void;

  @State('elections')
  elections!: Elections[];

  mounted() {
    const elections: Elections[] = [
      {
        name: "First"
      },
      {
        name: "Second"
      },
    ]
    this.setElections(elections);
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
