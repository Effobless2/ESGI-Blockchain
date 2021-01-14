<template>
    <div>
        <h1>Les Elections</h1>
        <election-item 
            v-for="e in elections"
            v-bind:key="`election_${e.id}`"
            :election="e">
        </election-item>
    </div>
</template>

<style scoped src="./ElectionsList.css"> </style>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Election from "@/models/Election";
    import ElectionItem from '@/components/ElectionItem';

    @Component({
        components: {
            ElectionItem
        }
    })
    export default class ElectionsList extends Vue {

        @Prop({required: true})
        elections!: Election[];
    }

</script>
