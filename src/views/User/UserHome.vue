<template>
    <div>
        <h1>Welcome, {{userInfo.firstName}}</h1>
        <footer>
            <UserLogout/>
        </footer>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import {useUserStore} from '@/stores/user.js'
import {mapState, mapActions} from 'pinia'
import UserLogout from '@/components/UserLogout.vue'

    export default {
        name: 'UserHome',
        components:{
            UserLogout
        },
        computed:{
            ...mapState(useUserStore,['userInfo', 'userId'])
        },
        methods:{
            ...mapActions(useUserStore,['getUserInfo', 'getUserId']),
            handleError(response){
                console.log(response);
            }
        },
        beforeMount(){
            this.getUserId(cookies.get('userToken'))
        },
        mounted(){
            useUserStore().$onAction(({name, after})=>{
                if (name == "getUserIdAlert"){
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