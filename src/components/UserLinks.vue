<template>
<div>
    <v-app height="100">
    <v-card>
        <v-app-bar
        dark
        prominent
        height="300"
        src="https://allthatsinteresting.com/wordpress/wp-content/uploads/2013/05/cinemagraph-gifs-aliens-computer-room.gif"
        >
        <v-app-bar-title center>Movies At Home</v-app-bar-title>
        <template v-slot:extension>
                <v-tabs
                align-with-title
                show-arrows>
                    <v-tab  to="/home">Home</v-tab> 
                    <v-tab to="/search">Search for movies</v-tab> 
                    <v-tab to="/profile">View Profile</v-tab> 
                    <v-tab to="/postreview">Post Reviews</v-tab>   
                    <!-- <v-tab to="/myreviews">View My Reviews</v-tab>               -->
                    <v-tab v-if="adminStatus" to="/movieupload">New movie entry</v-tab> 
                    <v-tab v-if="adminStatus" to="/reviewapprove">Review Approval</v-tab>                        
                </v-tabs>
        </template>
        </v-app-bar>
    </v-card>
    </v-app>
</div>
</template>

<script>

import cookies from 'vue-cookies'
import {mapState, mapActions} from 'pinia'
import {useUserStore} from '@/store/user.js'
    export default {
        name: 'UserLinks',
        computed:{
            ...mapState(useUserStore,['adminStatus'])
        },
        methods:{
            ...mapActions(useUserStore,['getAdminInfo']),
            handleError(response){
                console.log(response);
            },

        },
        beforeMount(){
            this.getAdminInfo(cookies.get('userToken'))
        },
        mounted(){
            useUserStore().$onAction(({name, after})=>{
                if (name == "getUserInfoAlert"){
                    console.log("handling");
                    after((response)=>{
                        this.handleError(response);
                    })
                }
            })
        }
    }

</script>

<style lang="scss" scoped>

</style>