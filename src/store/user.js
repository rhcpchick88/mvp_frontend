import axios from "axios";
import { defineStore } from "pinia";
import cookies from 'vue-cookies';
import {router} from '@/router'

export const useUserStore = defineStore('user', {
    state : () => {
        return{
            userInfo : {},
            adminStatus: ''
        }
    },
    actions : {

        // user login

        userLogin(email, password){
            axios.request({
                headers:{
                    "Content-Type" : "application/json"
                },
                url:process.env.VUE_APP_API_URL+"user-login",
                method:"POST",
                data:{
                    email,
                    password
                }
            }).then((response)=>{
                cookies.set('userToken', response.data);
                console.log(response);
                router.push('/home')
            }).catch((error)=>{
                console.log(error.response.data);
                this.userLoginAlert(error.response);
            })
        },
        userLoginAlert(error){
            return(error)
        },

        // register user

        submitUser(email, 
            username,
            password,
            firstName, 
            lastName, 
            aboutMe,   
            favoriteMovie, 
            favoriteGenre,
            pictureOne, 
            pictureTwo, 
            pictureThree){
                axios.request({
                    url:process.env.VUE_APP_API_URL+"user",
                    method:"POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    data:{
                        email,
                        username,
                        password,
                        firstName,
                        lastName,
                        aboutMe,
                        favoriteMovie,
                        favoriteGenre,                        
                        pictureOne,
                        pictureTwo,
                        pictureThree
                    }
                }).then((response)=>{
                    cookies.set('userToken', response.data);
                    console.log(cookies.get('userToken'));
                    router.push('/profile');
                }).catch((error)=>{
                    console.log(error.response.data);
                    this.userRegisterAlert(error.response);
                })
            },
            userRegisterAlert(error){
                return(error)
            },
        // update user I DID NOT GET AROUND TO THIS AS 
        // REVIEWS WERE MY PRIORITY. WILL ADD AT A LATER
        // DATE

        // updateUser(email, 
        //     username,
        //     password,
        //     firstName, 
        //     lastName, 
        //     aboutMe,
        //     favoriteMovie, 
        //     favoriteGenre,             
        //     pictureOne, 
        //     pictureTwo, 
        //     pictureThree){
        //         axios.request({
        //             headers:{
        //                 "Content-Type" : "application/json",
        //                 "token":cookies.get('userToken')
        //             },
        //             url:process.env.VUE_APP_API_URL+"user",
        //             method:"PATCH",
        //             data:{
        //                 email,
        //                 username,
        //                 password,
        //                 firstName,
        //                 lastName,
        //                 aboutMe,
        //                 favoriteMovie,
        //                 favoriteGenre,                        
        //                 pictureOne,
        //                 pictureTwo,
        //                 pictureThree,
        //             }
        //         }).then((response)=>{
        //             console.log(response);
        //             router.push('/profile');
        //         }).catch((error)=>{
        //             console.log(error.response.data);
        //             this.userUpdateAlert(error.response);
        //         })
        //     },
        //     userUpdateAlert(error){
        //         return(error)
        //     },

        // DELETE user I DID NOT GET AROUND TO THIS AS 
        // REVIEWS WERE MY PRIORITY. WILL ADD AT A LATER
        // DATE

        // deleteUser(){
        //     axios.request({
        //         headers: {
        //             "token":cookies.get('userToken'),
        //         },
        //         url:process.env.VUE_APP_API_URL+'user',
        //         method:"DELETE"
        //     }).then((response)=>{
        //         cookies.remove('userToken', response.data.token);
        //         console.log(response);
        //         router.push('/');
        //     }).catch((error)=>{
        //         console.log(error.response.data);
        //         this.userDeleteAlert(error.response);
        //     })
        // },
        // userDeleteAlert(error){
        //     return (error)
        // },

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
                this.userInfo = response.data[0];
            }).catch((error)=>{
                this.getUserInfoAlert(error.response);
            })
        },
        getUserInfoAlert(error){
            return (error)
        },

        // to get admin status for viewing of various 
        // routes, as well as v-tabs.

        getAdminInfo(){
            axios.request({
                headers:{
                    "token":cookies.get('userToken')
                },
                url:process.env.VUE_APP_API_URL+'user',
                method:"GET"
            }).then((response)=>{
                cookies.get('userToken');
                this.adminStatus = response.data[0][8];
            }).catch((error)=>{
                this.getAdminInfoAlert(error.response);
            })
        },
        getAdminInfoAlert(error){
            return (error)
        }                
    }
})


