<template>
    <div>
        <b-form>
            <div class="row">
                <b-form-group
                        id="input-group-1"
                        label="Election Name:"
                        class="col-8"
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.name"
                            type="text"
                            placeholder="Enter name"
                            required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        id="input-group-2"
                        label="Number of votes available:"
                        class="col-4"
                >
                    <b-form-input
                            id="input-2"
                            v-model="form.votesNumber"
                            type="number"
                            placeholder="Enter name"
                            required
                    ></b-form-input>
                </b-form-group>
            </div>
            <b-form-group
                    label="Candidate:"
                    v-for="(c,i) in form.candidates"
                    v-bind:key="`input_${i}`"
            >
                <b-form-input
                        v-model="form.candidates[i]"
                        type="text"
                        placeholder="Enter candidate"
                        required
                ></b-form-input>
            </b-form-group>
            <div class="btnCandidate">
                <b-button class="btnAddCandidate" size="lg" v-on:click="form.candidates.push('')">
                    <b-icon-person-plus class="iconPlus"></b-icon-person-plus>
                </b-button>
                <b-button class="btnDeleteCandidate" size="lg" v-on:click="form.candidates.pop('')"
                          v-if="form.candidates.length > 2">
                    <b-icon-person-dash class="iconMinus"></b-icon-person-dash>
                </b-button>
            </div>
            <div class="btnOk">
                <b-button block class="submit" :disabled="!formIsValid" v-on:click="AddElection">
                    Create
                </b-button>
            </div>
        </b-form>
    </div>

</template>

<style scoped src="./ElectionForm.css"></style>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Action} from "vuex-class";
    import Election from "@/models/Election";

    interface formData {
        name: string;
        candidates: string[];
        votesNumber: number;
    }

    @Component
    export default class ElectionForm extends Vue {
        form: formData = {
            name: "",
            candidates: ["", ""],
            votesNumber: 0
        };

        @Action('addElection')
        addElection!: (data: { electionName: string, candidateNames: string[], votesNumber: number }) => Promise<Election> | undefined;

        async AddElection() {
            const result = await this.addElection({
                electionName: this.form.name,
                candidateNames: this.form.candidates,
                votesNumber: this.form.votesNumber
            });
            this.$emit("election-created", result)
        }

        get formIsValid(): Boolean {
            if (this.form.name != "" && this.form.candidates.every(x => x.length != 0)) {
                return true;
            } else {
                return false;
            }
        }
    }

</script>
