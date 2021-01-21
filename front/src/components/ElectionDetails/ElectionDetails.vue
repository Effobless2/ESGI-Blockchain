<template>
    <b-card :title="election.name" class="electionCard">
        <b-card-body>
      <b-card-text>
            <div 
                class="row candidateRow"
                v-for="(candidate, i) in election.candidates"
                v-bind:key="`election_${election.id}_candidate_${i}`">
                
                <p class="col-2 candidateName">{{ candidate.name }}</p> 
                <div class="col-8">
                    <b-progress
                        :max="totalVotes"
                        animated>
                        <b-progress-bar
                            :variant="bestCandidate === candidate ? 'success' : 'default'"
                            :value="candidate.votes">
                            <span>{{ (candidate.votes / totalVotes * 100).toFixed(2)}} %</span>
                        </b-progress-bar>
                    </b-progress>
                </div>
                <p class="col-2">{{ candidate.votes }} Votes</p>
            </div>
      </b-card-text>
    </b-card-body>
    </b-card>
</template>

<style scoped src="./ElectionDetails.css"> </style>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Election from "@/models/Election";
import Candidate from '@/models/Candidate';

    @Component
    export default class ElectionDetails extends Vue {
        @Prop({required: true})
        election!: Election;

        get totalVotes(): number {
            let res = 0;
            this.election.candidates.map(x => {
                res += x.votes;
            });
            return res;
        }

        get bestCandidate(): Candidate {
            let res = this.election.candidates[0];
            for (let i = 0; i < this.election.candidates.length; i++) {
                if (res.votes < this.election.candidates[i].votes) {
                    res = this.election.candidates[i];
                }
            }
            return res
        }
    }

</script>
