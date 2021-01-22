<template>
    <div>
        <h1>{{election.name}}</h1>
        <div v-bind:key="candidate.name" v-for="candidate in election.candidates">
            <p>{{candidate.name}} {{candidate.votes}}</p>
        </div>

<div class="drag-container" v-drag-and-drop:options="options">
    <ul class="drag-list">
      <li class="drag-column" v-for="group in groups" :key="group.id">
        <span class="drag-column-header">
          <h2>{{ group.name }}</h2>
        </span>
        <vue-draggable-group
          v-model="group.items"
          :groups="groups"
          :data-id="group.id"
          @change="onGroupsChange"
        >
          <ul class="drag-inner-list" :data-id="group.id">
            <li class="drag-item" v-for="item in group.items" :key="item.id" :data-id="item.id">
              <div class="drag-item-text">{{ item.name }}</div>
            </li>
          </ul>
        </vue-draggable-group>
      </li>
    </ul>
  </div>
        
    </div>
</template>

<style scoped src="./VoteForm.css">

</style>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import Election from "@/models/Election";
    
    @Component
    export default class VoteForm extends Vue{
        @Prop({required:true})
        election!:Election;
        @Watch("election")
        electionOnChange(newValue:Election, oldValue:Election){
            this.groups =  [
                {
                    id: 1,
                    name: "To Do",
                    items: [
                        { id: 1, name: "Item 1", groupId: 1 },
                        { id: 2, name: "Item 2", groupId: 1 },
                        { id: 3, name: "Item 3", groupId: 1 }
                    ] 
                }
            ];
        }

        options = {
            dropzoneSelector: ".drag-inner-list",
            draggableSelector: ".drag-item"
        };

        groups = [
            {
                id: 1,
                name: "To Do",
                items: [
                    { id: 1, name: "Item 1", groupId: 1 },
                    { id: 2, name: "Item 2", groupId: 1 },
                    { id: 3, name: "Item 3", groupId: 1 }
                ] 
            }
        ];

        onGroupsChange(e) {
            console.log({ e });
        };
        

    }
</script>