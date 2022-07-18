<template>
    <div>
    <div>
        <v-app-bar
        dark
        absolute
        prominent
        src="https://image1.masterfile.com/getImage/NjU5LTA2MTg2MDg2ZW4uMDAwMDAwMDA=AC72EV/659-06186086en_Masterfile.jpg">
        <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to top right, rgba(255,192,0,0.742734593837535), rgba(25,32,72,.7)"
            ></v-img>
        </template>
                <v-tabs>
                    <v-tab  to="/home">Home</v-tab> 
                    <v-tab to="/search">Search for movies</v-tab> 
                    <v-tab to="/profile">View Profile</v-tab> 
                    <v-tab to="/postreview">Post Reviews</v-tab> 
                    <v-tab v-if="adminStatus" to="/movieupload">New movie entry</v-tab> 
                    <v-tab v-if="adminStatus" to="/reviewapprove">Review Approval</v-tab>                        
                </v-tabs>
        </v-app-bar>
    </div>
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