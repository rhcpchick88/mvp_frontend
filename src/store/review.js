import axios from "axios";
import { defineStore } from "pinia";
import cookies from 'vue-cookies';
import {router} from '@/router'

export const useReviewStore = defineStore('review', {
    state : () => {
        return{
            reviewInfo : {}
        }
    },
    actions : {

        // post review

        submitReview(movie,
            review, 
            rating){
                axios.request({
                    url:process.env.VUE_APP_API_URL+"reviews",
                    method:"POST",
                    headers: {
                        "token":cookies.get('userToken'),
                        "Content-Type" : "application/json"
                    },
                    data:{
                        movie,
                        review,
                        rating
                    }
                }).then((response)=>{
                    console.log(response);
                    router.push('/postreview');
                }).catch((error)=>{
                    console.log(error.response.data);
                    this.reviewPostAlert(error.response);
                })
            },
            reviewPostAlert(error){
                return(error)
            },
        // update review
        updateReview(movie,
            review,
            rating){
                axios.request({
                    headers:{
                        "token":cookies.get('userToken'),
                        "Content-Type" : "application/json"
                        
                    },
                    url:process.env.VUE_APP_API_URL+"reviews",
                    method:"PATCH",
                    data:{
                        movie,
                        review,
                        rating
                    }
                }).then((response)=>{
                    console.log(response);
                    router.push('/postreview');
                }).catch((error)=>{
                    console.log(error.response.data);
                    this.reviewEditAlert(error.response);
                })
            },
            reviewEditAlert(error){
                return(error)
            },
        //request user's review info
        getReview(){
            axios.request({
                headers:{
                    "token":cookies.get('userToken')
                },
                url:process.env.VUE_APP_API_URL+'reviews',
                method:"GET",
            }).then((response)=>{
                cookies.get('userToken');
                console.log(response);
                this.reviewInfo = response.data;
            }).catch((error)=>{
                this.getReviewInfoAlert(error.response);
            })
        },
        getReviewInfoAlert(error){
            return (error)
        },
    }
})


