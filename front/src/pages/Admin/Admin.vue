<template>
    <div>
        <div class="row mainDiv">
            <div class="col-4">
                <h2>Liste des elections</h2>
                <div class=contList>
                    <b-button block class="btnAdd" size="lg" v-on:click="modalShow = true">
                        <b-icon-plus-circle class="iconPlus"></b-icon-plus-circle>
                        Add Election
                    </b-button>
                    <elections-list :elections="elections" v-on:election-click="setCurrentElection"
                                    :selected="currentElection"></elections-list>
                </div>
            </div>
            <div class="col-8">
                <h2>Details</h2>
                <election-details :election="currentElection" v-if="currentElection != null"></election-details>

                <b-card v-else class="choose">
                    <b-card-text>
                        <h1><b>Choose an election</b></h1>
                    </b-card-text>
                </b-card>

            </div>
        </div>
        <b-modal hide-footer id="modal-xl" size="xl" title="Add Election" v-model="modalShow">
            <election-form v-on:election-created="electionCreated"></election-form>
        </b-modal>
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
    import ElectionForm from "@/components/ElectionForm/ElectionForm.vue";

    @Component({
        components: {ElectionForm, ElectionDetails, ElectionsList}
    })
    export default class Admin extends Vue {

        @State('elections')
        elections!: Election[];

        currentElection: Election | null = null;
        modalShow: Boolean = false;

        setCurrentElection(election: Election) {
            this.currentElection = election;
        }

        electionCreated(election: Election) {
            this.modalShow = false;
            this.currentElection = election;
        }
    }
</script>
