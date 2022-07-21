import axios from "axios";
import { defineStore } from "pinia";


export const useMovieStore = defineStore('movie', {
    state : () => {
        return {
            movieResult: {},
            reviewInfo: {}
        }
    },
    actions : {
        // fuzzy search for specific movie.
        movieSearch(search){
            axios.request({               
                url:process.env.VUE_APP_API_URL+'movie-search',
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                data:{
                    search
                    //takes in search params from the movie search page.
                }
            }).then((response)=>{
                this.movieResult = response.data;
                console.log(response);                
            }).catch((error)=>{
                this.getMovieResultAlert(error.response);
            })
        },
        getMovieResultAlert(error){
            return (error)
        },    
        // return reviews for the movie
        reviewList(reviewSearch){
            axios.request({
                headers:{
                    "Content-Type" : "application/json"
                },
                url:process.env.VUE_APP_API_URL+'movie-list',
                method:"POST",
                //I made this method a post for now, until I can figure
                // out a better system. I used the return data from the 
                // GET request for movie search, to POST and search
                // for a relevant review.
                // as of now, I am not sure if it works for movies with
                // multiple names but I will be correcting that in the 
                // future. For now, I can show some reviews, yay.
                data:{
                    reviewSearch
                }
            }).then((response)=>{
                this.reviewInfo = response.data;
                console.log(response);                
            }).catch((error)=>{
                this.getReviewAlert(error.response);
            })
        },
        getReviewAlert(error){
            return (error)
        },        
    }
})


