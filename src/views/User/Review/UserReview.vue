<template>
    <div>
    <div id="app">
    <v-app id="inspire">
        <v-form>
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
                    title,
                    review,
                    rating,
                )"> Submit Review </v-btn>
            </v-card>
        </v-form>
    </v-app>
</div>
    </div>
</template>

<script>
import {useReviewStore} from '@/store/review.js'
import {mapActions} from 'pinia'
    export default {
        name: 'UserReview',
        data: () => ({
            movie:'',
            review:'',
            rating:''       
        }),
    methods: {
        ...mapActions(useReviewStore,['submitReview']),
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
    mounted () {
        useReviewStore().$onAction(({name, after})=>{
            if (name == "reviewPostAlert"){
                console.log("handling");
                after((response)=>{
                    this.handleError(response);
                })
            }
        });
    },
    }

    
</script>

<style lang="scss" scoped>

</style>