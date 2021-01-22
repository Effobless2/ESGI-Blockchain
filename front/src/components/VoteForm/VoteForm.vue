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
        <b-button class="btnSumit" size="lg" block>Submit</b-button>
    </div>
</template>

<style scoped src="./VoteForm.css">
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import DraggableCandidate from "@/components/DraggableCandidate";
import Election from "@/models/Election";
import Candidate from "@/models/Candidate";

@Component({
    components: {
        DraggableCandidate
    }
})
export default class VoteForm extends Vue {
    @Prop({ required: true })
    election!: Election;
    
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

    candidates: Candidate[] = this.election.candidates ?? [];
}
</script>