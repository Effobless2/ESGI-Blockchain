<template>
    <b-card no-body class="mainCard">
        <b-card-header 
            v-b-toggle.collapse="`election_${election.id}`">
            <div>
                <h1>{{ election.id }} : {{ election.name }}</h1>
            </div>
        </b-card-header>
        <b-collapse
            v-bind:id="`election_${election.id}`"
            accordion="accordionView">
            <b-card-body>
                <election-details :election="election"> </election-details>
            </b-card-body>
        </b-collapse>
    </b-card>
</template>
<style scoped src="./ElectionItem.css">

</style>
<script lang="ts">
import Election from '@/models/Election';
import {Component, Prop, Vue} from 'vue-property-decorator';
import ElectionDetails from "@/components/ElectionDetails/ElectionDetails.vue";
@Component({
    components: {ElectionDetails}
})
export default class ElectionItem extends Vue {
    @Prop({required: true})
    election!: Election;

}
</script>
