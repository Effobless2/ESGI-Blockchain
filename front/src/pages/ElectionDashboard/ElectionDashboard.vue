<template>
    <div class='row mainDiv'>
        <div class="col-4">
            <div class="contList">
                <elections-list
                    :elections="elections"
                    :selected="selected"
                    v-on:election-click="(x) => selected = x">
                </elections-list>
            </div> 
        </div>
        <div class="col-8">
            <election-details :election="selected" v-if="selected !== null" class="details"></election-details>

            <b-card v-else class="choose">
                <b-card-text>
                    <h1 class="defaultTitle">Choose an election</h1>
                </b-card-text>
            </b-card>

        </div>
    </div>
</template>
<style scoped src="./ElectionDashboard.css">

</style>

<script lang="ts">
import Election from '@/models/Election';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ElectionsList from '@/components/ElectionsList';
import ElectionDetails from '@/components/ElectionDetails';

@Component({
    components: {
        ElectionsList,
        ElectionDetails
    }
})
export default class ElectionDashboard extends Vue {
    @State('elections')
    elections!: Election[];

    selected: Election | null = null;

}
</script>