<template>
    <div class='row mainDiv'>
        <div class="col-4">
            <div class="contList">
                <elections-list
                    :selected="selected"
                    :elections="elections.filter(x => x.canBeVoted)"
                    v-on:election-click="(x) => selected = x">
                </elections-list>
            </div> 
        </div>
        <div class="col-8">
            <b-card class="choose">
                <b-card-text class="defaultTitle" v-if="selected === null">
                    <h1><b>Choose an election</b></h1>
                </b-card-text>
                <vote-form v-else :election="selected"></vote-form>
            </b-card>
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
