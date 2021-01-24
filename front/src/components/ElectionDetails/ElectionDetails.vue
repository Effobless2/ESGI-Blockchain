<template>
    <b-card :title="election.name" class="electionCard">
        <b-card-body>
            <b-card-text>
                <div class="row switch">
                    <b-button v-if="election.isCreator && !election.isOpenToVote" :disabled="!canBeStarted" v-on:click="openToVote" class="smartBtn">
                        {{ switchLabel }}
                    </b-button>
                    <div v-else></div>
                    <p>Number of votes : {{ election.numberOfVotes }} / {{ election.maxVotes }}</p>
                </div>
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
                                animated
                                :class="isBestCandidate(candidate) ? 'success' : 'default'"
                                :value="candidate.votes">
                            <span v-if="(candidate.votes / totalVotes * 100).toFixed(2) > 8">
                                {{ (candidate.votes / totalVotes * 100).toFixed(2)}} %
                            </span>
                            </b-progress-bar>
                        </b-progress>
                    </div>
                    <p class="col-2">{{ candidate.votes }} Points</p>
                </div>
                <div class="row" v-if="canApply">
                    <b-button class="smartBtn" block v-on:click="showModal = true">
                        This election waits for applicants : Apply !
                    </b-button>
                </div>
            </b-card-text>
        </b-card-body>
        <b-modal 
            v-model="showModal"
            hide-footer
            hide-header>
            <b-modal-text>
                <div class="row">
                    <b-form-group
                        id="input-group-1"
                        label="Enter Name"
                        class="col-8">
                        <b-form-input
                            id="input-1"
                            v-model="name"
                            type="text"
                            placeholder="User name"
                            required>
                        </b-form-input>
                    </b-form-group>
                </div>
                <b-button block class="smartBtn" v-on:click="apply" :disabled="name === ''">Apply !</b-button>
            </b-modal-text>
        </b-modal>
    </b-card>
</template>

<style scoped src="./ElectionDetails.css"></style>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Election from "@/models/Election";
    import Candidate from '@/models/Candidate';
    import { Action } from 'vuex-class';

    @Component
    export default class ElectionDetails extends Vue {
        @Prop({required: true})
        election!: Election;

        showModal: boolean = false;

        name: string = "";

        
        @Action('openToVote')
        openToVoteAction!: (electionId: number) => Promise<boolean>;

        @Action("apply")
        applyAction!: (data: { id: number, name: string }) => Promise<boolean>;

        get totalVotes(): number {
            let res = 0;
            this.election.candidates.map(x => {
                res += x.votes;
            });
            return res;
        }

        get switchLabel(): string {
            return this.election.candidates.length < 2 ?
                'Not enough candidates yet.' :
                this.election.isOpenToVote ?
                    'Votes are processing' :
                    this.election.maxVotes === this.election.numberOfVotes ?
                        'Election closed.' :
                        'Close Applications and start Votes'
        }

        isBestCandidate(candidate :Candidate): boolean {
            let res = candidate;
            for (let i = 0; i < this.election.candidates.length; i++) {
                if (res.votes < this.election.candidates[i].votes) {
                    res = this.election.candidates[i];
                }
            }
            return res === candidate
        }

        get canBeStarted(): boolean {
            return this.election.isCreator &&
                this.election.candidates.length >= 2 &&
                !this.election.isOpenToVote &&
                this.election.numberOfVotes === 0;
        }

        async apply() {
            try {
                const result = await this.applyAction({ id: this.election.id, name: this.name });
                if (result) {
                    this.showModal = false;
                    (this as any).$snotify.success(`You're in ${this.election.name} as ${this.name}! `, "Applied to Election !");
                }
                else {
                    (this as any).$snotify.error("Please, check your connection", "An error occured");
                }

            } catch (e) {
                    (this as any).$snotify.error("Please, check your connection", "An error occured");
            }
        }

        get canApply(): boolean {
            return this.election.isOpenForApplication;
        }

        async openToVote() {
            try {
                const result = await this.openToVoteAction(this.election.id);
                if(result) {
                    (this as any).$snotify.success(`The election ${this.election.name} has been started `, "The Election has started !");
                }
                else {
                    (this as any).$snotify.error("Please, check your connection", "An error occured");
                }

            } catch (e) {
                (this as any).$snotify.error("Please, check your connection", "An error occured");
            }
        }
    }

</script>
