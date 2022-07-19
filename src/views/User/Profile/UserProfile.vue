<template>
    <div>
        <v-card>
            <h1>
                Welcome, {{userInfo[4]}} <img class="icon" src="data:image/png;base64,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">
            </h1>
            <h2 v-if="adminStatus">Status: <span class="admin">Admin</span> </h2>
        </v-card>
        <v-card
        width="100vw"
        class="mx-auto"
        >
        <v-img
        src="https://25.media.tumblr.com/4b3b0287ca43ce1021340cd692f65f9f/tumblr_mj7iufgKNi1qghl49o1_500.gif"
        height="550px"
        dark
        >
        </v-img>
            <v-list two-line>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title1">{{userInfo[2]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Username</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{userInfo[1]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Email</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{userInfo[4]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">First Name</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{userInfo[5]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Last Name</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{userInfo[9]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Favorite Movie</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{userInfo[10]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Favorite Genre</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>                
            </v-list>
        </v-card>
        <UserLogout/>
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
            ...mapState(useUserStore,['userInfo','adminStatus'])
        },
        methods:{
            ...mapActions(useUserStore,['getUserInfo','getAdminInfo']),
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
h1 {
    margin:10px;
    background-image:"https://img.freepik.com/free-vector/cinema-film-festival-movie-poster-background_1017-33461.jpg";
    text-align:center;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 3em;
}
h2{
    margin:10px;
    text-align:center;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.admin{
    font-size:1em;
    color:red;
}
.icon{
    height:50px;
}
.title1{
    font-size:40px;
}
.title2{
    font-size:25px;
}
.subtitle{
    font-size:1rem;
}

</style>