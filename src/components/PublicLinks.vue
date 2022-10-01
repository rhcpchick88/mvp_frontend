<template>
    <div>
        <v-app height="100">
        <v-card>
            <v-app-bar
            dark
            prominent
            src="https://allthatsinteresting.com/wordpress/wp-content/uploads/2013/05/cinemagraph-gifs-aliens-computer-room.gif"
            >
            <v-app-bar-title center>Movies At Home</v-app-bar-title>
            <template v-slot:extension>
                    <v-tabs
                    align-with-title
                    show-arrows>
                        <v-tab  to="/">Home</v-tab> 
                        <v-tab to="/search">Search for movies</v-tab> 
                        <v-tab to="/login">User Login/Register</v-tab>                  
                    </v-tabs>
            </template>
            </v-app-bar>
        </v-card>
        </v-app>
    </div>
</template>

<script>
    export default {
        name : 'PublicLinks'
    }
</script>

<style lang="scss" scoped>
</style>