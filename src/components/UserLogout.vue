<template>
    <div>
        <v-btn @click="logout">Log out</v-btn>
        <div v-if="error"> 
            <p> Unable to Log out </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name: 'UserLogout',
        methods: {
            logout: function(){
                axios.request({
                    url: process.env.VUE_APP_API_URL+"user-login",
                    method : "DELETE",
                    headers:{
                        "token" : cookies.get('userToken')
                    }                
                }).then((response)=>{
                    cookies.remove('userToken', response.data.token)
                    console.log(response);
                    this.$router.push('/');
                }).catch((error)=>{
                    console.log(error);
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>