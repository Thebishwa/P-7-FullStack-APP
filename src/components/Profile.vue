<template>
  <section>
    <div class="profile" v-if="user.firstName">
      <h3>Profile</h3>
      <br>
      <form>
        <label class="userInfo-label" for="firstName">Name</label> 
        <div class="userInfo" v-if="showUpdateInput==false">{{ user.firstName }}</div>
        <div class="userUpdate" v-if="showUpdateInput==true">  
          <input 
            type="text"
            name="firstName"
            class="userUpdate"
            v-model="userUpdate.firstName"
            placeholder="Update your name..."
            required/>
        </div>
        <label class="userInfo-label" for="lastName">Last Name</label> 
        <div class="userInfo" v-if="showUpdateInput==false">{{ user.lastName }}</div>
        <div class="userUpdate" v-if="showUpdateInput==true">  
          <input
            type="text"
            name="lastName"
            class="userUpdate"
            v-model="userUpdate.lastName"
            placeholder="Update your last name..."
            required/>
        </div>
        <label class="userInfo-label" for="email">Email</label>
        <div class="userInfo" v-if="showUpdateInput==false">{{ user.email }}</div>
        <div class="userUpdate" v-if="showUpdateInput==true"> 
          <input
            type="email"
            name="email"
            class="userUpdate"
            v-model="userUpdate.email"
            placeholder="Update your email..."
            required/>
        </div>
      </form>
      <div>
        <div class="profile-btn">
          <button @click="toggle()" v-if="showUpdateInput==false">Update</button>
          <button @click="updateUser()" v-if="showUpdateInput==true" id="confirmButton">Confirm</button>
          <button @click="toggle()" v-if="showUpdateInput==true" id="backButton">Back</button>
          <button id="delete-button" @click="deleteUser()" v-if="showUpdateInput==false">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';

export default {
  name: "My-profile",

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
      },
      showUpdateInput:false,
      userUpdate :{
        firstName: '',
        lastName: '',
        email: '',
      }
    };
  },

  methods:{
    //////////////////////////////////////////////////////////////////////////////////////////
    //update user - show input
    toggle() {
      this.showUpdateInput = !this.showUpdateInput
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    //update user - axios put
    async updateUser(){
      const user = localStorage.userId
      const url = `api/user/profile/${user}/update`
      const updateUser = { 
        firstName: this.userUpdate.firstName,
        lastName: this.userUpdate.lastName,
        email: this.userUpdate.email
      }
      await axios.put(url, updateUser, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) => {
        const res = response.data;
        console.log(res);
        alert('User updated!')
        this.$router.push('/home')
      })
      .catch((error) => {
        alert(error.message)
      });
      
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    //delete user - axios delete
    async deleteUser(){
      const user = localStorage.userId
      const url = `api/user/profile/${user}/delete`
      await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      this.$router.push('/')
    }
  },

  
  async mounted() {
    //////////////////////////////////////////////////////////////////////////////////////////
    //get user data - axios get
    const user = localStorage.userId
    const url = `api/user/profile/${user}`
    await axios.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response => {
      let user = response.data
      this.user.firstName = user.firstName
      this.user.lastName = user.lastName
      this.user.email = user.email
    }).catch(error => {
      console.log(error)
    })
  }

};
</script>

<style>

.profile {
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 250px;
  min-height: 400px;
  width: 40%;
  max-width: 500px;
  border-radius: 15px;
  padding: 40px;
  padding-top:50px;
  background: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.profile h3{
  color: white;
  border-bottom: 1px solid;
  text-align: center;
  padding-bottom: 20px;
}

.userInfo {
  border: 1px solid black;
  background: white;
  min-height: 30px;
  width: 90%;
  max-width: 500px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 25px;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
}

.userInfo-label {
  padding-left: 20px;
  min-height: 10px;
  max-width: 500px;
  width: 90%;
  margin: auto;
  font-size: medium;
  color: white
}

.profile-btn {
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 30px;
}

.userUpdate {
  text-align: center;
}
.userUpdate input {
  background: white;
  min-height: 30px;
  width: 90%;
  max-width: 500px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 25px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
}

#backButton{
  background-color: #333;
}

#confirmButton{
  background-color: #333;
}

#confirmButton:hover{
  background-color: green;
}

@media only screen and (max-width: 768px) {
  .profile {
    width:75%;
    margin-top:-20px;
  }
}
</style>
