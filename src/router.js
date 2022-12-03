import Vue from 'vue'
import Router from 'vue-router'
import Forum from '@/components/Forum.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Create from '@/components/Create.vue'
import Profile from '@/components/Profile.vue'
import Homepage from '@/components/Homepage.vue'


Vue.use(Router)


export default new Router ({
    mode: 'history', //remove # in url
    routes: [
        {path: '/', component: Homepage},
        {path: '/home', component: Forum},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/home/create', component: Create},
        {path: '/profile', component: Profile},
    ]
})