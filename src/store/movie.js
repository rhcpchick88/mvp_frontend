import axios from "axios";
import { defineStore } from "pinia";


export const useMovieStore = defineStore('movie', {
    state : () => {
        return {
            movieInfo : {},
            movieResult: {},
            reviewResult: {}
        }
    },
    actions : {
        // public movie list
        movieList(){
            axios.request({               
                url:process.env.VUE_APP_API_URL+'movie-list',
                method:"GET"
            }).then((response)=>{
                this.movieInfo = response.data;
                console.log(response);                
            }).catch((error)=>{
                this.getMovieInfoAlert(error.response);
            })
        },
        getMovieInfoAlert(error){
            return (error)
        },
        movieReviewSearch(movieId){
            axios.request({
                url:process.env.VUE_APP_API_URL+'movie-list',
                method:"POST",
                headers:{"Content-Type":"application/json",
                },
                data:{
                    movieId
                }
            }).then((response)=>{
                this.reviewResult = response.data;
                console.log(response);
            }).catch((error)=>{
                console.log(error);           
            })
        },
        getReviewInfoAlert(error){
            return(error)
        },
        movieSearch(search){
            axios.request({               
                url:process.env.VUE_APP_API_URL+'movie-search',
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                data:{
                    search
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
    }
})


