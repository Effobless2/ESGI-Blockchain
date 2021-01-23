<template>
    <div>
        <h1>{{ election.name }}</h1>
        <div class="row mainRow">
            <div class="col-2 nbDivs">
                <h1 v-for="(_, index) in candidates" v-bind:key="`nb_${index}`"> {{ index + 1 }}</h1>
            </div>

            <div class="col-10"
                 v-drag-and-drop:options="options">
                <vue-draggable-group
                        v-model="candidates"
                        :groups="candidates">

                    <div class="drag-inner-list">
                        <div
                                class="drag-item"
                                v-for="candidate in candidates"
                                v-bind:key="`candidate_${candidate.id}`"
                                :data-id="candidate.id"
                        >
                            <draggable-candidate :candidate="candidate"></draggable-candidate>
                        </div>
                    </div>
                </vue-draggable-group>
            </div>
        </div>
        <b-button class="btnSumit" size="lg" block v-on:click="showModal = true">Submit</b-button>
        <b-modal
                hide-header
                hide-footer
                v-model="showModal">
            <p>Do you want to valid ?</p>
            <b-button block class="submit" v-on:click="submit">
                OK
            </b-button>
        </b-modal>
    </div>
</template>

<style scoped src="./VoteForm.css">
</style>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import DraggableCandidate from "@/components/DraggableCandidate";
    import Election from "@/models/Election";
    import Candidate from "@/models/Candidate";
    import {Action} from "vuex-class";

    @Component({
        components: {
            DraggableCandidate
        }
    })
    export default class VoteForm extends Vue {
        @Prop({required: true})
        election!: Election;

        @Action("vote")
        vote!: (data: { id: number, votes: number[] }) => Promise<boolean>;

        showModal: boolean = false;

        @Watch("election")
        electionOnChange(newValue: Election, _: Election) {
            this.candidates = newValue.candidates;
        }

        get options() {
            return {
                dropzoneSelector: ".drag-inner-list",
                draggableSelector: ".drag-item",
            };
        }

        async submit() {
            const data = {
                id: this.election.id,
                votes: this.candidates.map((x: Candidate) => {
                    return x.id
                })
            };
            const voted = await this.vote(data);
            this.showModal = false;
        }

        candidates: Candidate[] = this.election.candidates ?? [];
    }
</script>
