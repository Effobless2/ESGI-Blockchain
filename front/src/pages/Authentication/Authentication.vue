<template>
    <div id="demo">
        <h1>Authentication</h1>
        <vue-metamask :userMessage="msg" @onComplete="onComplete"></vue-metamask>
    </div>
</template>
<style scoped src="./Authentication.css">

</style>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import VueMetamask from 'vue-metamask';

    @Component({
        components : {
            VueMetamask
        }
    })

    export default class Authentication extends Vue {

        msg = "This is demo net work";

        onComplete(data: any){
            console.log('data:', data);
        }
    }

</script>
