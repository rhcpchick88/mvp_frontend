<template>
<div>
    <div id="app">
    <v-app id="inspire">
        <v-form>
            <v-card height="70"><h1 class="review">Post review</h1></v-card>
            <v-card>
                <h1>Movie Title</h1>
                <v-text-field
                v-model="movie"
                hint="Enter movie title"
                label="The movie title must match a movie that exists in database!"
                single-line
                required
                clearable
                ></v-text-field>
                <h1>Review:</h1>
                <v-textarea
                v-model="review"
                hint="Post review"
                single-line
                multiple
                required
                clearable
                counter
                maxlength="300"
                ></v-textarea>
                <h1>Rating: (optional)</h1>
                <v-rating
                v-model="rating"
                background-color="orange"
                color="yellow"
                large
                ></v-rating>
                <v-btn  @click="submitReview(
                    movie,
                    review,
                    rating,
                )" dark> Submit Review </v-btn>
            </v-card>
        <v-card height="70" >
            <h1 class="mine">My reviews</h1>
        </v-card>            
        <v-card
        width="100vw"
        class="mx-auto"
        v-for="review in reviewInfo"
        :key="review[0]"
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
    </div>
    <div>
        <UserLogout/>
    </div>
</div>    
</template>

<script>
import UserLogout from '@/components/UserLogout.vue'
import { useReviewStore } from '@/store/review.js'
import {mapActions, mapState} from 'pinia'
    export default {
        name: 'UserReview',
        components:{
            UserLogout
        },
        data: () => ({
            movie:'',
            review:'',
            rating:''       
        }),
        computed:{
            ...mapState(useReviewStore,['reviewInfo']),
            
        },
        methods: {
            ...mapActions(useReviewStore,['submitReview','getReview']),
            handleReview() {
                //Some kind of form validation
                this.submitForm(this.movie,
                this.review,
                this.rating
                );
            },
            handleError(response){
                console.log(response);
            }
        },
        beforeMount(){
            this.getReview()
        },
        mounted () {
            useReviewStore().$onAction(({name, after})=>{
                if (name == "reviewPostAlert"){
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
h1{
    text-align:center;

}
h2 {
    font-weight:400;
    text-align:center;
}
.review, .mine {
    background-color:rgba(171, 117, 16, 0.743);
    font-size:50px;
    text-align:center
}
</style>