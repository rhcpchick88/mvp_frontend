<template>
    <div>
        <v-container>
        <h1>
            Welcome, {{userInfo[4]}}
        </h1>
        </v-container>
        <footer>
            <UserLogout/>
        </footer>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import {useUserStore} from '@/store/user.js'
import {mapState, mapActions} from 'pinia'
import UserLogout from '@/components/UserLogout.vue'

    export default {
        name: 'UserProfile',
        components:{
            UserLogout
        },
        computed:{
            ...mapState(useUserStore,['userInfo'])
        },
        methods:{
            ...mapActions(useUserStore,['getUserInfo']),
            handleError(response){
                console.log(response);
            }
        },
        beforeMount(){
            this.getUserInfo(cookies.get('userToken'))
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