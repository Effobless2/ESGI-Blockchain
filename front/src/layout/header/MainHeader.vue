<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/dashboard" :class="[isCurrent('') ? 'current' : '']">
                    Dashboard
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item to="/" :class="[isCurrent('') ? 'current' : '']">
                    Manage Elections
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item to="/elections"  :class="[isCurrent('elections') ? 'current' : '']">
                    Vote for an Election
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<style scoped src="./MainHeader.css">

</style>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    class Header extends Vue {
        isCurrent(uri: string): boolean {
            return this.$route.name == uri;
        }

    }

    export default Header;
</script>
