<template>
  <div id="app">
		<header id="header">
			<a href="/" class="logo">Song_writr 🎵</a>
		</header>
					<nav id="nav">
						<ul class="links">
							<router-link to="/" tag="li" exact-active-class="active"><a>Home 🏠</a></router-link>
							<router-link to="/rhyming" tag="li" active-class="active"><a>Rhyming Generator 📝</a></router-link>
							<router-link to="/record" tag="li" active-class="active"><a>Record 🎙</a></router-link>
							<router-link  v-if="!isLoggedIn()" to="/signup" tag="li" active-class="active"><a>Signup ✍️</a></router-link>
							<router-link  v-if="!isLoggedIn()" to="/login" tag="li" active-class="active"><a>Login 🔐</a></router-link>
							<router-link  v-if="isLoggedIn()" to="/synth" tag="li" active-class="active"><a>Keyboard 🎹</a></router-link>
							<router-link class="logout" v-if="isLoggedIn()" to="/logout" tag="li" active-class="active"><a>Logout 🔒</a></router-link>
							<router-link class="my-songs"  v-if="isLoggedIn()" to="/mysongs" tag="li" active-class="active"><a>My Music 🎵</a></router-link>
						</ul>
					</nav>
    	<!-- Header -->

				<!-- Nav -->
							
			
					

    <router-view/>
    
  </div>
</template>

<style>
.my-songs {
  position: absolute;
  margin-left: 61em;
}

.logout {
  position: absolute;
  margin-left: 52em;
}

li:hover {
  color: #18bfef;
  cursor: pointer;
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>