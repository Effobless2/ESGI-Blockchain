<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <elections></elections>
    <authentication></authentication>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator';
import Elections from './pages/Elections/Elections.vue';
import Authentication from './pages/Authentication/Authentication.vue'; 

@Component({
  components : {
    HelloWorld,
    Elections,
    Authentication
  }
})
export default class App extends Vue {
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
