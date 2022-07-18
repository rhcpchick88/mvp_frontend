// show user links if user is logged in, otherwise show public links.
// can't search for movies, just lists them.

<template>
    <div>
        <div>
                <v-card 
                class="mx-auto"
                max-width="500"
                outlined
                elevation="2"
                loading
                shaped
                v-for="movie in movieInfo" 
                :key="movie[0]">
                    <v-card-title>
                        {{movie.title}}
                    </v-card-title >
                    <v-card-subtitle>
                        {{movie.tagline}}
                    </v-card-subtitle>
                    <v-card-text>
                        Release date: {{movie.releaseDate}}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        outlined
                        rounded
                        text>Click to load reviews</v-btn>
                    </v-card-actions>
                </v-card>
        </div>
    </div>
</template>

<script>
import {useMovieStore} from '@/store/movie.js'
import {mapState, mapActions} from 'pinia'


    export default {
        name : 'MovieView',
        computed: {
            ...mapState(useMovieStore, ['movieInfo']),
        },
        methods:{
            ...mapActions(useMovieStore,['movieList']),
            handleError(response){
                console.log(response);
            }
        },
        beforeMount(){
            this.movieList()
        },
        mounted(){
            useMovieStore().$onAction(({name, after})=>{
                if (name == "getMovieInfoAlert"){
                    console.log("handling");
                    after((response)=>{
                        this.handleError(response);
                    })
            }
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>