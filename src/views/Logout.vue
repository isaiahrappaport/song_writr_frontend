<template>
  <div class="logout">
    <h1>Successfully logged out!</h1>
    <a href="/">Go Home</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.$router.push("/");
  },
};
</script>