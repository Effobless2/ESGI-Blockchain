<template>
    <b-card no-body>
        <b-card-header>
            <div class="row draggableHead">
                <b-icon-view-list scale=2.5></b-icon-view-list>
                <h4>{{ candidate.name }}</h4>
                <div></div>
            </div>
        </b-card-header>
    </b-card>
</template>

<style scoped src="./DraggableCandidate.css">

</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Candidate from '@/models/Candidate';

@Component
export default class DraggableCandidate extends Vue {
    @Prop({ required: true })
    candidate!: Candidate;

}
</script>