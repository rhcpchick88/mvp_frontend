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
            width="1000"
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
                                rounded
                                text><h2>Click to load reviews</h2></v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
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
            search:''
        }),
        computed:{
            ...mapState(useMovieStore,['movieResult'])
        },
        methods:{
            ...mapActions(useMovieStore,['movieSearch']),
            handleSearch(){
                this.movieSearch(this.search);
            },
            handleError(response){
                console.log(response);
            }
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