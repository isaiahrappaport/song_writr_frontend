<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      
      <router-link to="/signup">Signup</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/logout">Logout</router-link>
      <router-link to="/mysongs">My Songs</router-link>
    </div>
    <!-- header -->
    <header>
     <h3> Song_writr </h3>
    </header>
    <router-view/>
    
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #000000;
  padding: 30px;
  padding-bottom: 0%;
  text-decoration: none;
}

#nav a:hover {
  color: aliceblue;
  font-size: 20px;
}

#nav a.router-link-exact-active {
  color: aliceblue;
}
</style>
