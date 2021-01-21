<template>
    <b-card :title="election.name" class="electionCard">
        <b-card-body>
      <b-card-text>
            <div 
                class="row candidateRow"
                v-for="(candidate, i) in election.candidates"
                v-bind:key="`election_${election.id}_candidate_${i}`">
                
                <p class="col-3">{{ candidate.name }}</p> 
                <div class="col-8">
                    <b-progress :value="candidate.votes" :max="totalVotes" show-progress animated></b-progress>
                </div>
                <p class="col-1">{{ candidate.votes }} Votes</p>
            </div>
      </b-card-text>
    </b-card-body>
    </b-card>
</template>

<style scoped src="./ElectionDetails.css"> </style>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Election from "@/models/Election";

    @Component
    export default class ElectionDetails extends Vue {
        @Prop({required: true})
        election!: Election;

        created(){
            for(let i = 0; i < this.election.candidates.length; i++) {
                this.election.candidates[i].votes = i;
            }
        }

        get totalVotes(): number {
            let res = 0;
            this.election.candidates.map(x => {
                res += x.votes;
            });
            return res;
        }
    }

</script>
