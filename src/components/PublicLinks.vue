// Links on public view 
<template>
    <div>
        <nav
        width="100vw">
            <v-btn to="/">Home</v-btn> |
            <v-btn to="/search">Search for movies</v-btn> |
            <v-btn to="/login">User Login/Register</v-btn>
        </nav>
    </div>
</template>

<script>
    export default {
        name : 'PublicLinks'
    }
</script>

<style lang="scss" scoped>
</style>