<template>
    <div>
        <h2 v-for="e in elections">
            {{e.name}}
        </h2>
    </div>
</template>

<style scoped src="./ElectionsList.css"> </style>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Election from "@/models/Election";

    @Component
    export default class ElectionsList extends Vue {

        @Prop({required: true})
        elections!: Election[];
    }

</script>
