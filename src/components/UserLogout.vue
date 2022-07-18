<template>
    <div>
        <v-btn @click="logout">Log out</v-btn>
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