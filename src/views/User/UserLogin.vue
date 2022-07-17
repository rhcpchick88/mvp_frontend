<template>
    <div>      
        <v-app id="inspire">
            <h1>Log in here:</h1>
            <v-form>
            <v-container>
                <v-row>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                        required
                        ></v-text-field>
                    </v-col>                    
                </v-row>
            </v-container>
            </v-form>
        <v-btn @click="handleUserLogin()">Click to Log in</v-btn>
        <h1>Register your account here:</h1>
        <v-btn @click="goToRegister()">Click to go to Registration Form:</v-btn>   
        </v-app>
    </div>
</template>

<script>
import {useUserStore} from '@/store/user.js'
import {mapActions} from 'pinia'

export default {
    name : 'UserLogin',
    data : () => ({
        email: "",
        password: "",
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
        v => !!v || 'Password is required',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must be at least 5 characters and contain at least one lowercase letter, one number, and one uppercase letter',
        ]
    }),  
    methods: {
            ...mapActions(useUserStore, ['userLogin']),
            handleUserLogin(){
                this.userLogin(this.email,
                this.password);
            },
            handleError(response){
                console.log(response);
            },
            goToRegister() {
                this.$router.push('/register')
            }
    },
    mounted(){
        useUserStore().$onAction(({name, after})=>{
            if (name == "userLoginAlert"){
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