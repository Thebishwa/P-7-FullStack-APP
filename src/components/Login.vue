<template>
  <section class="login-box">
    <form @submit.prevent="handleLogin">
      <div class="login-form">
        <div class="center">
          <h3>Login</h3>
          <br>
          <div class="form-group">
            <label class="userForm-label" for="email">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Email"
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

          <input type="submit" value="Login" />

          <div class="register_link">
            Not a member? <router-link to="/Register">Register</router-link>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login-form",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("/api/user/login", {
        email: this.email,
        password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        //user logged info stored
        localStorage.setItem("userId", response.data.userID);
        //redirect to home after login
        if (response.status == 200) {
          // this.$router.push("home");
          window.location.assign('/home')
          }
        } catch (err) {
          if (err.response.status == 404) {
            alert("User doesn't exist!")
          }
        }
    },
  },
};

</script>

<style>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.login-form {
  border: 1px solid black;
  border-radius: 10px;
  background-color: #333;
  color: white;
  padding: 55px;
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
  .login-box {
    display: block;
  }

  .login-form {
    border-radius: 0;

  }
  
}

@media only screen and (max-width: 480px) {

  .login-form {
    padding:15px;
  }
  
}
</style>
