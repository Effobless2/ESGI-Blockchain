<template>
    <b-card no-body v-on:click="electionOnClick(election)">
        <b-card-header
                :class="['mainCard', selected ? 'selected':'']"
                v-b-toggle.collapse="`election_${election.id}`">
            <div>
                <h3>{{ election.name }}</h3>
            </div>
        </b-card-header>
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

        @Prop({required: true})
        selected!: Boolean;

        electionOnClick(election: Election) {
            this.$emit("election-click", election)
        }
    }
</script>
