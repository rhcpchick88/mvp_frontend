<template>
    <div>
    <div>
        <nav>
            <v-btn to="/home">Home</v-btn> |
            <v-btn to="/movieview">View Movie List</v-btn> |
            <v-btn to="/search">Search for movies</v-btn> |
            <v-btn to="/profile">View Profile</v-btn> |
            <v-btn to="/postreview">Post Reviews</v-btn> |
            <v-btn v-if="adminStatus" to="/movieupload">New movie entry</v-btn> |
            <v-btn v-if="adminStatus" to="/reviewapprove">Review Approval</v-btn> |                        
        </nav>
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