<template>
    <div>
        <h1>
            {{election.name}}
        </h1>
    </div>
</template>

<style scoped src="./ElectionDetails.css"> </style>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Election from "@/models/Election";

    @Component
    export default class ElectionDetails extends Vue {
        @Prop({required: true})
        election!: Election;
    }

</script>
