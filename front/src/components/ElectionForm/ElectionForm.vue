<template>
    <div>
        <b-form>
            <b-form-checkbox v-model="form.openToApplication" name="check-button" switch class="switch">
                {{ form.openToApplication ? 'Opened' : 'Closed'}} to free application
            </b-form-checkbox>
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
            <div
                class="candidateList"
                v-if="!form.openToApplication"
            >
                <div
                    v-for="(c,i) in form.candidates"
                    v-bind:key="`input_${i}`">
                    <b-form-group
                            label="Candidate:"
                    >
                    <div>
                        <b-form-input
                                v-model="form.candidates[i].name"
                                type="text"
                                placeholder="Enter candidate"
                                required
                        ></b-form-input>
                     
                    </div>   
                    <div>
                        <b-form-input
                                v-model="form.candidates[i].candidateAddress "
                                type="text"
                                placeholder="Ethereum Address:"
                                required
                        ></b-form-input>
                        
                    </div>
                    </b-form-group>
                </div>
            </div>
            <div class="btnCandidate" v-if="!form.openToApplication">
                <b-button class="btnAddCandidate" size="lg" v-on:click="form.candidates.push({name: '', candidateAddress: ''})">
                    <b-icon-person-plus class="iconPlus"></b-icon-person-plus>
                </b-button>
                <b-button class="btnDeleteCandidate" size="lg" v-on:click="form.candidates.pop()"
                          v-if="form.candidates.length > 2">
                    <b-icon-person-dash class="iconMinus"></b-icon-person-dash>
                </b-button>
            </div>
            <div class="btnOk">
                <b-button block class="submit" :disabled="!formIsValid" v-on:click="AddElection">
                    {{ form.openToApplication ? 'Create' : 'Create and Start' }}
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
        candidates: {name: string, candidateAddress: string}[];
        votesNumber: number;
        openToApplication: boolean;
    }

    @Component
    export default class ElectionForm extends Vue {
        form: formData = {
            name: "",
            candidates: [{name: "", candidateAddress: ""}, {name: "", candidateAddress: ""}],
            votesNumber: 0,
            openToApplication: false,
        };

        @Action('addElection')
        addElection!: (data: { electionName: string, candidateNames: {name: string, candidateAddress: string}[], votesNumber: number }) => Promise<Election> | undefined;


        async AddElection() {
            try {
                const result = await this.addElection({
                    electionName: this.form.name,
                    candidateNames: this.form.openToApplication ? [] : this.form.candidates,
                    votesNumber: this.form.votesNumber
                });
                if (result !== undefined) {
                    this.$emit("election-created", result);
                    (this as any).$snotify.success(`The election '${result.name}' has been created successfully`, "New Election !");
                }
                else {
                    
                (this as any).$snotify.error("Please, check your connection", "An error occured");
                }
            } catch (e) {
                (this as any).$snotify.error("Please, check your connection", "An error occured");
            }
        }

        get formIsValid(): Boolean {
            return this.form.name != "" &&
                this.form.votesNumber > 1 &&
                ( this.form.openToApplication || 
                  this.form.candidates
                    .every(x => x.name.length != 0 &&
                        x.candidateAddress.length));
        }
    }

</script>
