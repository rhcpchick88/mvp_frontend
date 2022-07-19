<template>
    <div>
        <v-card
        width="100vw"
        class="mx-auto"
        v-for="review in reviewInfo"
        :key="review.id"
        >
        <v-img
        src="https://secure-images.rarenewspapers.com/ebayimgs/9.8.2015/image071.jpg"
        height="550px"
        dark
        >
        </v-img>
            <v-list two-line>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title1">{{review.reviewInfo[4]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Movie Title</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{review.reviewInfo[1]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Review</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title2">{{review.reviewInfo[3]}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle">Rating</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>               
            </v-list>
        </v-card>
        <UserLogout/>
    </div>       
</template>

<script>

import {useReviewStore} from '@/store/review.js'
import {mapState, mapActions} from 'pinia'
import UserLogout from '@/components/UserLogout.vue'

    export default {
        name: 'ReviewView',
        components:{
            UserLogout
        },
        computed:{
            ...mapState(useReviewStore['reviewInfo'])
        },
        methods:{
            ...mapActions(useReviewStore['getReview']),            
            handleError(response){
                console.log(response);
            }
        },
        beforeMount(){
            this.getReview()
        },
        mounted(){
            useReviewStore().$onAction(({name, after})=>{
                if (name == "getReviewAlert"){
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