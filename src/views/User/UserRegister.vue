<!-- simple user registration page. As of now, 
users can enter pictures into the DB but it won't show on 
user profiles. I also need to add that it needs to 
be a URL, as well as some database rules and more
basic form entry rules.-->

<template>
    <div>
    <div id="app">
    <v-app id="inspire">
        <v-form>
        <v-container>
            <v-row>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="firstName"
                :rules="firstNameRules"
                label="First name"
                required
                ></v-text-field>
            </v-col>
    
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="lastName"
                :rules="lastNameRules"
                label="Last name"
                required
                ></v-text-field>
            </v-col>
    
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="password"
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="aboutMe"
                v-model="aboutMe"
                label="About Me"
                outlined
                ></v-text-field>
            </v-col> 
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="pictureOne"
                v-model="pictureOne"
                label="pictureOne"
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="pictureTwo"
                v-model="pictureTwo"
                label="PictureTwo"
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="pictureThree"
                v-model="pictureThree"
                label="PictureThree"
                outlined
                ></v-text-field>
            </v-col>  
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="favoriteMovie"
                v-model="favoriteMovie"
                label="favoriteMovie"
                outlined
                ></v-text-field>
            </v-col>   
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                type="favoriteGenre"
                v-model="favoriteGenre"
                label="favoriteGenre"
                outlined
                ></v-text-field>
            </v-col>                                

            </v-row>
        <v-btn  @click="submitUser(email, 
        username, 
        password, 
        firstName, 
        lastName, 
        aboutMe,
        favoriteMovie,
        favoriteGenre,     
        pictureOne,
        pictureTwo,
        pictureThree)"> Register </v-btn>
        </v-container>
        </v-form>
    </v-app>
</div>
    </div>
</template>

<script>
import {useUserStore} from '@/store/user.js'
import {mapActions} from 'pinia'
    export default {
        name: 'UserRegister',
        data: () => ({
            email:'',
            username:'',
            firstName:'',
            lastName:'',
            password:'',
            aboutMe:'',
            pictureOne:'',
            pictureTwo:'',
            pictureThree:'',
            favoriteMovie:'',
            favoriteGenre:'',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
            v => !!v || 'Password is required',
            v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must be at least 5 characters and contain at least one lowercase letter, one number, and one uppercase letter',
            ],
            firstNameRules: [
            v => !!v || 'First name is required'
            ], 
            lastNameRules: [
            v => !!v || 'Last name is required'
            ],        
            usernameRules: [
            v => !!v || 'Username is required'
            ],                  
        }),
    methods: {
        ...mapActions(useUserStore,['submitUser']),
        handleUserRegistration() {
            //Some kind of form validation
            this.submitForm(this.email, 
            this.username, 
            this.password, 
            this.firstName, 
            this.lastName, 
            this.aboutMe, 
            this.favoriteMovie,
            this.favoriteGenre,
            this.pictureOne, 
            this.pictureTwo, 
            this.pictureThree,
            );
        },
        handleError(response){
            console.log(response);
        }
    },
    mounted () {
        useUserStore().$onAction(({name, after})=>{
            if (name == "userRegisterAlert"){
                console.log("handling");
                after((response)=>{
                    this.handleError(response);
                })
            }
        });
    },
    }
    
</script>

<style lang="scss" scoped>
</style>