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
        <v-btn @click="login">Click to Log in</v-btn>
        <h1>Register your account here:</h1>
        <v-btn @click="goToRegister()">Click to go to Registration Form:</v-btn>   
        </v-app>
    </div>
</template>

<script>
import cookies from 'vue-cookies';
import axios from 'axios';

export default {
    name : 'UserLogin',
    data() {
            return {
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
            }
        },     
        methods: {
            userLogin() {
                return cookies.get('userToken')
            },           
            login: function(){
                axios.request({
                    url:process.env.VUE_APP_API_URL+"user-login",
                    method:"POST",
                    data:{
                        email : this.email,
                        password : this.password,
                    },                    
                }).then((response)=>{
                    cookies.set('userToken', response.data.token)
                    cookies.set('userId', response.data.token)
                    console.log(response);
                    this.$router.push('/home');
                }).catch((error)=>{
                    console.log(error);
                })
            },
            goToRegister() {
                this.$router.push('/register')
            }
        }
}
</script>

<style lang="scss" scoped>
</style>