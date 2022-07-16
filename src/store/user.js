import axios from "axios";
import { defineStore } from "pinia";
import cookies from 'vue-cookies';
import {router} from '@/router'

export const userStore = defineStore('user', {
    state : () => {
        return{
            userInfo : {}
            userId:undefined
        }
    },
    actions : {
        // register user

        submitUser(email, 
            username,
            firstName, 
            lastName, 
            aboutMe, 
            pictureOne, 
            pictureTwo, 
            pictureThree, 
            adminStatus, 
            favoriteMovie, 
            favoriteGenre){
                axios.request({
                    url:process.env.VUE_APP_API_URL+"user",
                    method:"POST",
                    data:{
                        email,
                        username,
                        firstName,
                        lastName,
                        aboutMe,
                        pictureOne,
                        pictureTwo,
                        pictureThree,
                        adminStatus,
                        favoriteMovie,
                        favoriteGenre
                    }
                }).then((response)=>{
                    cookies.set('userToken', response.data.token);
                    cookies.set('userId', response.data.clientId);
                    console.log(cookies.get('userToken'));
                    router.push('/userprofile');
                }).catch((error)=>{
                    console.log(error.response.data);
                    this.userRegisterAlert(error.response);
                })
            },
            userRegisterAlert(error){
                return(error)
            },
        // update user
        updateUser(email, 
            username,
            firstName, 
            lastName, 
            aboutMe, 
            pictureOne, 
            pictureTwo, 
            pictureThree, 
            adminStatus, 
            favoriteMovie, 
            favoriteGenre){
                axios.request({
                    headers:{
                        "token":cookies.get('userToken')
                    },
                    url:process.env.VUE_APP_API_URL+"user",
                    method:"PATCH",
                    data:{
                        email,
                        username,
                        firstName,
                        lastName,
                        aboutMe,
                        pictureOne,
                        pictureTwo,
                        pictureThree,
                        adminStatus,
                        favoriteMovie,
                        favoriteGenre
                    }
                }).then((response)=>{
                    console.log(response);
                    router.push('/profile');
                }).catch((error)=>{
                    console.log(error.response.data);
                    this.userUpdateAlert(error.response);
                })
            },
            userUpdateAlert(error){
                return(error)
            },
        // delete user profile
        deleteUser(){
            axios.request({
                headers: {
                    "token":cookies.get('userToken'),
                },
                url:process.env.VUE_APP_API_URL+'user',
                method:"DELETE"
            }).then((response)=>{
                cookies.remove('userToken', response.data.token);
                cookies.remove('userId', response.data.token);
                console.log(response);
                router.push('/');
            }).catch((error)=>{
                console.log(error.response.data);
                this.userDeleteAlert(error.response);
            })
        },
        userDeleteAlert(error){
            return (error)
        },
        //request user info
        getUserInfo(){
            axios.request({
                headers:{
                    "token":cookies.get('userToken')
                },
                url:process.env.VUE_APP_API_URL+'user',
                method:"GET"
            }).then((response)=>{
                cookies.get('userToken');
                console.log(response);
                this.userInfo = response.data;
                this.getUserInfoAlert(error.response);
            })
        },
        //request for user ID
        getUserId(){
            axios.request({
                headers:{
                    "token":cookies.get('userToken')
                },
                url:process.env.VUE_APP_API_URL+'user',
                method:"GET",
                params:{
                    userId
                }
            }).then((response)=>{
                cookies.get('userToken');
                console.log(response.data[0]);
                this.userId=response.data.userId
                this.userInfo=response.data[0]
            }).catch((error)=>{
                console.log(error.response.data);
                this.getUserIdAlert(error.response);
            })
        }
    }
})


