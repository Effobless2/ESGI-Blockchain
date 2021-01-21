<template>
    <div>
        <h1>Administration</h1>
        <div class="row mainDiv">
            <div class="col-4">
                <h2>Liste des elections</h2>
                <div class=contList>
                    <b-button class="btnAdd" size="lg" variant="dark" v-on:click="AddElection"><b-icon-plus-circle class="iconPlus"></b-icon-plus-circle> Add Election</b-button>
                    <elections-list :elections="elections" v-on:election-click="setCurrentElection"></elections-list>
                </div>
            </div>
            <div class="col-8">
                <h2>Details</h2>
                <election-details :election="currentElection" v-if="currentElection != null"></election-details>
            </div>
        </div>
    </div>
</template>
<style scoped src="./Admin.css">

</style>
<script lang="ts">
    import Election from '@/models/Election';
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {mapActions} from 'vuex';
    import {Action, State} from 'vuex-class';
    import ElectionsList from "@/components/ElectionsList/ElectionsList.vue";
    import ElectionDetails from "@/components/ElectionDetails/ElectionDetails.vue";

    @Component({
        components: {ElectionDetails, ElectionsList}
    })
    export default class Admin extends Vue {

        @State('elections')
        elections!: Election[];

        currentElection: Election | null = null;

        @Action('addElection')
        addElection!: (data: { electionName: string, candidateNames: string[] }) => Promise<Election> | undefined;

        async AddElection() {
            const result = await this.addElection({
                electionName: "Mon Sondage Front",
                candidateNames: ["Vue", "Angular", "React.POOP"]
            });
        }

        setCurrentElection(election: Election) {
            this.currentElection = election;
        }
    }
</script>
