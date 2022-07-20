<template>
    <div>
        <v-app>
            <v-form>
                <v-card height="70" >
                    <h1 class="mine">My reviews</h1>
                </v-card>   
                <v-card
                width="100vw"
                class="mx-auto"
                v-for="review in reviewResult"
                :key="review[6]"
                >
                    <v-list two-line>
                        <!-- <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="title1">{{title}}</v-list-item-title>
                                <v-list-item-subtitle class="subtitle">Movie Title</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item> -->
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <h1>Review:</h1>
                                <h2>{{review[1]}}</h2>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <h1>Rating:</h1>
                                <h2>{{review[3]}}</h2>
                            </v-list-item-content>
                        </v-list-item>               
                    </v-list>
                </v-card>            
            </v-form>
        </v-app>
    <div>
        <UserLogout/>
    </div>
    </div>
</template>

<script>
import UserLogout from '@/components/UserLogout.vue'
import {useMovieStore} from '@/store/movie.js'
import {useUserStore} from '@/store/user.js'
import {mapActions, mapState} from 'pinia'
    export default {
        name: 'UserReview',
        components:{
            UserLogout
        },
        data:() => ({
            movieId: '',
        }),
        computed:{
            ...mapState(useMovieStore,['reviewResult']),
            ...mapState(useUserStore, ['userInfo'])
        },
        methods: {
            ...mapActions(useMovieStore,['movieReviewSearch']),
            ...mapActions(useUserStore, ['getUserInfo']),
            handleReviewGet() {
                //Some kind of form validation
                this.submitForm(this.movieId,
                );
            },
            handleError(response){
                console.log(response);
            }
        },
        beforeMount(){
            this.getUserInfo(),
            this.movieReviewSearch()
        },
        mounted () {
            useMovieStore().$onAction(({name, after})=>{
                if (name == "getReviewInfoAlert"){
                    console.log("handling");
                    after((response)=>{
                        this.handleError(response);
                    })
                }
                if (name == "getReviewInfoAlert"){
                    console.log("handling");
                    after ((response)=>{
                        this.handleError(response)
                    })
                }
            });
        },
    }

    
</script>

<style lang="scss" scoped>
.review, .mine {
    background-color:rgba(171, 117, 16, 0.743);
    font-size:50px;
    text-align:center
}
</style>