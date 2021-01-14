<template>
  <h1> {{election.id}} : {{election.name}} </h1>
</template>
<style scoped src="./ElectionItem.css">

</style>
<script lang="ts">
import Election from '@/models/Election';
import {Component, Prop, Vue} from 'vue-property-decorator';
@Component
export default class ElectionItem extends Vue {
    @Prop({required: true})
    election!: Election;

}
</script>