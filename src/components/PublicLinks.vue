// Links on public view 
<template>
    <div>
        <nav>
            <v-btn to="/">Home</v-btn> |
            <v-btn to="/movieview">View Movie List</v-btn> |
            <v-btn to="/search">Search for movies</v-btn> |
            <v-btn to="/client">User Login/Register</v-btn>
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