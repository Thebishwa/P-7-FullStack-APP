<template>
  <section class="register-box">
    <form @submit.prevent="handleSubmit">
      <div class="register-form">
        <div class="center">
          <h3>Register</h3>
          <br>
          <div class="form-group">
            <label class="userForm-label" for="first_name">First name</label> 
            <input
              type="first_name"
              class="form-control"
              v-model="firstName"
              placeholder="First Name"
              required
            />
          </div>

          <div class="form-group">
            <label class="userForm-label" for="last_name">Last name</label> 
            <input
              type="last_name"
              class="form-control"
              v-model="lastName"
              placeholder="Last Name"
              required
            />
          </div>

          <div class="form-group">
            <label class="userForm-label" for="email">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label class="userForm-label" for="password">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>

          <!-- <div class="form-group">
                    <label></label>
                    <input type="password_confirm" class="form-control" v-model="password_confirm" placeholder="Confirm password" required />
                </div> -->

          <input type="submit" value="Register" />

          <div class="register_link">
            Already a member? <router-link to="/Login">Login</router-link>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "register-form",

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post("/api/user/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
      this.$router.push("login");  
      } catch (err) {
        // alert(err.response.data.error.errors)
        let errors = err.response.data.error.errors
        errors.forEach((error) => {
          alert(error.message)
        })
        if (err.response.status == 401) {
          alert("User already exist");
        }
      }
    },
  },
};
</script>

<style>

.userForm-label{
  min-height: 10px;
  max-width: 500px;
  width: 90%;
  margin: auto;
  color: white;
  padding-bottom:5px;
  font-size: x-large;
}

.register-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.register-form {
  border: 1px solid black;
  border-radius: 10px;
  background-color: #333;
  color: white;
  padding: 60px;
  box-shadow: 0px 2px 8px rgb(0, 0, 0, 1);
}

.center h3 {
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid;
}

.form-group {
  padding: 15px;
  box-sizing: border-box;
  text-align: center;
  display: grid;
}

input[type="submit"] {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  border: 2px solid white;
  background: green;
  color: white;
  border-radius: 10px;
}

input[type="submit"]:hover {
  border-color: aqua;
  transition: 0.8s;
}

.register_link {
  margin-top: 30px;
  text-align: center;
}

.register_link a {
  color: aqua;
  text-decoration: none;
}

.register_link a:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 768px) {
  .register-box {
    display: block;
  }

  .register-form {
    border-radius: 0;
  }
  
}

@media only screen and (max-width: 480px) {

  .register-form {
    padding:15px;
  }
  
}
</style>

<style scoped>

</style>
