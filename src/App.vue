<template>
  <div>
    <v-container>
      <div>
        <div v-if=userLogin()><ClientLinks/></div>
        <div v-else><PublicLinks/></div>
    </div>
      <router-view/>
    </v-container>
  </div>
</template>

<script>
import cookies from 'vue-cookies'

import PublicLinks from "./components/PublicLinks.vue";
import UserLinks from "./components/UserLinks.vue";


export default {
    name: "App",
    data: () => ({
    //
    }),
    components: { 
      PublicLinks,
      UserLinks
      },
        methods: {
            userLogin() {
                return cookies.get('userToken')
            }
        },    
};
</script>