<template>
    <div>
        <h1>Administration</h1>
        <button v-on:click="AddElection">AddElection</button>
        <p>{{ elections }}</p>
    </div>
</template>
<style scoped src="./Admin.css">

</style>
<script lang="ts">
import Election from '@/models/Election';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { Action, State } from 'vuex-class';
@Component
export default class Admin extends Vue {

  @State('elections')
  elections!: Election[];

  @Action('addElection')
  addElection!: (data: {electionName: string, candidateNames: string[] }) => Promise<Election> | undefined;

  async AddElection() {
    const result = await this.addElection({electionName: "Mon Sondage Front", candidateNames: ["Vue", "Angular", "React.POOP"]});
  }
}
</script>