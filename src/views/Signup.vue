<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
           <div class="form-group">
        <label>Profile Picture:</label>
        <input type="file" v-on:change="setFile($event)" ref="fileInput">
      </div>
      <div class="form-group">
        <label>Name:</label> 
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group">
        <label>Username:</label> 
        <input type="text" class="form-control" v-model="username">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.form-group {
  text-align: center;
}

.signup {
  max-width: 72rem;
  margin: 0 auto;
  padding-left: 20em;
  padding-right: 20em;
  background-color: white;
  padding-bottom: 2em;
}
.form-control {
  width: 50%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px;
  padding: 1px 20px 12px 40px;
  transition: width 0.7s ease-in-out;
  margin: 20px;
  margin-left: 7.5em;
}

.btn {
  margin-left: 15em;
  margin-top: 1em;
}

.form-control:focus {
  width: 100%;
}

input {
  text-transform: uppercase;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  text-align: left;
  box-shadow: 8px 4px #beb9b9;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      profile_picture: "",
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.profile_picture = event.target.files[0];
      }
    },
    submit: function () {
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("profile_picture", this.profile_picture);
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);
      axios
        .post("/api/users", formData)
        .then((response) => {
          this.name = "";
          this.username = "";
          this.email = "";
          this.password = "";
          this.passwordConfirmation = "";
          this.$refs.fileInput.value = "";
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>