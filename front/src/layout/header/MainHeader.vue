<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand to="/">
            Home
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/elections">
                    Elections
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<style scoped src="./MainHeader.css">

</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
class Header extends Vue {
    mounted(){
        console.log("caca");
    }
    
}

export default Header;
</script>