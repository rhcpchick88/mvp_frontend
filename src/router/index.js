import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'vue-cookies'

Vue.use(VueRouter)


// Can't show pages other than movie search and view as those are public pages,
// therefore all other routes require user cookies.

function userAuth (to, from, next) {
  let userToken = cookies.get('userToken');
  if (userToken == null) {
    console.log('Error, unknown user');
    router.push('error');
  } else {
    next();
  }
}


const routes = [

  // PUBLIC ROUTES

    // error page if user is not logged in
  {
    path: '/error',
    name: 'notfound',
    component: () => import('../views/LoginError.vue')
  },
    // movie search page
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/MovieSearch.vue')
  },
    // movie list page
  {
    path: '/movieview',
    name: 'movies',
    component: () => import('../views/MovieView.vue')
  },

  // GENERAL USER ROUTES

    // user home
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/user/UserHome.vue'),
    beforeEnter: userAuth
  },
    // user login
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/UserLogin.vue')
  },
    // user register
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/UserRegister.vue')
  },

  // USER PROFILE ROUTES

    // profile view
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/profile/UserProfile.vue'),
    beforeEnter: userAuth
  },
    // profile edit
  {
    path: '/profileedit',
    name: 'profileedit',
    component: () => import('../views/user/profile/ProfileEdit.vue'),
    beforeEnter: userAuth
  },
  

  // USER REVIEW ROUTES

    // review post
  {
    path: '/postreview',
    name: 'postreview',
    component: () => import('../views/user/review/UserReview.vue'),
    beforeEnter: userAuth
  },
    // review edit
  {
    path: '/reviewedit',
    name: 'reviewedit',
    component: () => import('../views/user/review/ReviewEdit.vue'),
    beforeEnter: userAuth
  },
  {
    path:'/myreviews',
    name: 'myreviews',
    component: () => import('../views/user/review/MyReview.vue')
  },

  // ADMIN ROUTES

    // movie post
  {
    path: '/movieupload',
    name: 'movieupload',
    component: () => import('../views/user/admin/MovieUpload.vue'),
    beforeEnter: userAuth
  },
    // movie edit
  {
    path: '/editmovie',
    name: 'editmovie',
    component: () => import('../views/user/admin/MovieEdit.vue'),
    beforeEnter: userAuth
  },
    // movie view
  {
    path: '/mymovies',
    name: 'mymovies',
    component: () => import('../views/user/admin/MovieList.vue'),
    beforeEnter: userAuth
  },
    // review approve
  {
    path: '/reviewapprove',
    name: 'reviewapprove',
    component: () => import('../views/user/admin/ReviewApprove.vue'),
    beforeEnter: userAuth
  },  
]

export const router = new VueRouter({
  routes
})

export default router
