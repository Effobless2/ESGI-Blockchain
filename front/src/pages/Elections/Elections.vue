<template>
    <div class='row mainDiv'>
        <div class="col-4">
            <h2>Liste des elections</h2>
            <div class="contList">
                <elections-list
                    :selected="selected"
                    :elections="elections"
                    v-on:election-click="(x) => selected = x">
                </elections-list>
            </div> 
        </div>
        <div class="col-8">
            <h2>Details</h2>
            <b-card class="choose" v-if="selected === null">
                    <b-card-text>
                            <h1><b>Choose an election</b></h1>
                    </b-card-text>
            </b-card>
            <vote-form v-else :election="selected"></vote-form>
        </div>
    </div>
</template>
<style scoped src="./Elections.css">
</style>
<script lang="ts">
    import VoteForm from "@/components/VoteForm";
    import {Component, Vue} from 'vue-property-decorator';
    import Election from '@/models/Election';
    import ElectionsList from '@/components/ElectionsList';
    import { State } from 'vuex-class';

    @Component({
        components: {
            ElectionsList,
            VoteForm
        }
    })
    export default class Elections extends Vue {
        @State('elections')
        elections!: Election[];

        selected: Election | null = null;

    }
</script>
