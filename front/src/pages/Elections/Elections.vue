<template>
    <div class='row'>
        <div class="col-3">
            <elections-list
                :selected="selected"
                :elections="elections"
                v-on:election-click="(x) => selected = x">
            </elections-list>   
        </div>
    </div>
</template>
<style scoped src="./Elections.css">
</style>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Election from '@/models/Election';
    import ElectionsList from '@/components/ElectionsList';
    import { State } from 'vuex-class';

    @Component({
        components: {
            ElectionsList
        }
    })
    export default class Elections extends Vue {
        @State('elections')
        elections!: Election[];

        selected: Election | null = null;

    }
</script>
