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
    component: LoginError
  },
    // movie search page
  {
    path: '/search',
    name: 'search',
    component: MovieSearch
  },
    // movie list page
  {
    path: '/movieview',
    name: 'movies',
    component: MovieView
  },

  // GENERAL USER ROUTES

    // user home
  {
    path: '/home',
    name: 'home',
    component: UserHome
  },
    // user login
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
    // user register
  {
    path: '/register',
    name: 'register',
    component: UserRegister
  },

  // USER PROFILE ROUTES

    // profile view
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile
  },
    // profile edit
  {
    path: '/profileedit',
    name: 'profileedit',
    component: ProfileEdit
  },

  // USER REVIEW ROUTES

    // review post
  {
    path: '/postreview',
    name: 'postreview',
    component: UserReview
  },
    // review edit
  {
    path: '/reviewedit',
    name: 'reviewedit',
    component: ReviewEdit
  },
    // review view
  {
    path: '/myreviews',
    name: 'myreviews',
    component: ReviewView
  },  

  // ADMIN ROUTES

    // movie post
  {
    path: '/movieupload',
    name: 'movieupload',
    component: MovieUpload
  },
    // movie edit
  {
    path: '/editmovie',
    name: 'editmovie',
    component: MovieEdit
  },
    // movie view
  {
    path: '/mymovies',
    name: 'mymovies',
    component: MovieList
  },
    // review approve
  {
    path: '/reviewapprove',
    name: 'reviewapprove',
    component: ReviewApprove
  },  
]

const router = new VueRouter({
  routes
})

export default router
