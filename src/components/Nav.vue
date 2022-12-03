<template>
    <nav class="nbar">
      <ul>
        <!-- if user is not logged -->
        <li v-if="user==false" style="float: right"><router-link to="/Register">Register</router-link></li>
        <li v-if="user==false" style="float: right"><router-link to="/Login">Login</router-link></li>
        <!-- if user is logged -->
        <li class="logo" v-if="user==true"><router-link to="/home"><img src="../assets/groupomania_logo.png" alt="groupomania_logo"></router-link></li>
        <li v-if="user==true" style="float: right" @click="logout()"><router-link to="/">Logout</router-link></li>
        <li v-if="user==true" style="float: right"><router-link to="/Profile">Profile</router-link></li>
      </ul>
    </nav>
</template>

<script>
  export default {
    name: "Nav-bar",

    data(){
      return{
        user:false
      }
    },

    methods: {
      logout() {
        localStorage.clear()
        window.location.assign('/');
      },
    },

    beforeMount() {
      let userId = localStorage.userId
      if(userId){
        this.user = true
      } else {
        this.user = false
      }
    },
  };
</script>

<style>

.nbar{
  height: 60px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

/* .active {
    background-color: #04AA6D;
  } */

ul {
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  border-right: 1px solid #bbb;
  border-left: 1px solid #bbb;
}

@media only screen and (max-width: 380px) {
 .logo img{
  width: 105px;
 }
  li a {
    padding:10px 10px;
  }
}

</style>

<style scoped>
.logo img {
  width: 135px;
}
</style>
