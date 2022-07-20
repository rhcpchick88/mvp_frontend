// show user links if user is logged in, otherwise show public links.
// shows search function instead of listed movies.

<template>
<div id="app">
    <v-app id="inspire">
        <v-container fixed>
            <v-card
            class="pa-4 justify-center"
            flat
            height="300px"
            img="https://ak.picdn.net/shutterstock/videos/22955491/thumb/1.jpg">
                <v-container>
                    <v-row no-gutters>
                        <v-col
                        md="6"
                        offset-md="3"
                        color="pink"><strong>
                            <v-text-field 
                            v-model="search"
                            color="black"
                            placeholder="Movie name" 
                            label="Type movie name here"
                            clearable
                            outlined
                            width="12">
                            </v-text-field></strong>                    
                        </v-col>
                        <v-col
                        md="6"
                        offset-md="5">
                        <v-btn @click="movieSearch(search)">search</v-btn>    
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-spacer/>

            <v-card 
            class="mxy-16"
            height="50vh"
            max-width="2000"
            outlined
            elevation="2"
            img="https://motionarray.imgix.net/preview-79920-w7DoVIIPVS-high_0005.jpg?w=660&q=60&fit=max&auto=format"
            v-for="movie in movieResult" 
            :key="movie.id">
                <v-container>
                    <v-row
                    class="row">
                    </v-row>
                    <v-row
                    class="row"
                    justify="space-between">
                        <v-col
                        cols="12"
                        class=" d-flex flex-column justify-center align-center">                    
                            <v-card-title>
                                <h1>{{movie[0][0]}}</h1>
                            </v-card-title >
                        </v-col>
                    </v-row>
                    <v-row
                    class="row"
                    justify="center">
                        <v-col
                        cols="12"
                        class=" d-flex flex-column justify-center align-center">                                        
                            <v-card-actions
                            class="justify-center">
                                <v-btn
                                class="justify-center"
                                outlined
                                text
                                dark><v-btn @click="movieReviewSearch(movie[1][0])">Click to load reviews</v-btn></v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-container v-if=reviewResult>
                <v-card 
                class="mxy-16"
                height="50vh"
                max-width="2000"
                outlined
                elevation="2"
                img="https://motionarray.imgix.net/preview-79920-w7DoVIIPVS-high_0005.jpg?w=660&q=60&fit=max&auto=format"
                v-for="review in reviewResult" 
                :key="review.id">
                    <h1>Review:{{review.review}}</h1>
                    <h2>Rating:{{review.rating}}</h2>
                </v-card>   
            </v-container>         
        </v-container>
    </v-app>
</div>
</template>

<script>
import {useMovieStore} from '@/store/movie.js'
import {mapState, mapActions} from 'pinia'

    export default {
        name: 'MovieSearch',
        data:() => ({
            search:'',
            movieId:'',
        }),
        computed:{
            ...mapState(useMovieStore,['movieResult','reviewResult'])
        },
        methods:{
            ...mapActions(useMovieStore,['movieSearch','movieReviewSearch']),
            handleSearch(){
                this.movieSearch(this.search);
            },
            handleReviewSearch(){
                this.movieReviewSearch(this.movieId);
            },
            handleError(response){
                console.log(response);
            },
        },
        mounted(){
            useMovieStore().$onAction(({name, after})=>{
                if (name == "getMovieResultAlert"){
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
.row {
    height:125px
}

</style>