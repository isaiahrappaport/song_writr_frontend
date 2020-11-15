<template>
  <div id="app">
		<header id="header">
			<a href="/" class="logo">Song_writr 🎵</a>
		</header>
					<nav id="nav">
						<ul class="links">
							<router-link to="/" tag="li" exact-active-class="active"><a>Home 🏠</a></router-link>
							<router-link to="/mysongs" tag="li" active-class="active"><a>My Music 🎵</a></router-link>
							<router-link to="/login" tag="li" active-class="active"><a>Login 🔐</a></router-link>
							<router-link to="/signup" tag="li" active-class="active"><a>Signup ✍️</a></router-link>
							<router-link to="/logout" tag="li" active-class="active"><a>Logout 🔒</a></router-link>
							<router-link to="/rhyming" tag="li" active-class="active"><a>Rhyming Generator 📝</a></router-link>
							<router-link to="/record" tag="li" active-class="active"><a>Record 🎙</a></router-link>
						</ul>
					</nav>
    	<!-- Header -->

				<!-- Nav -->
							
			
					

    <router-view/>
    
  </div>
</template>

<style>
#nav:hover {
  cursor: pointer;
}

li:hover {
  color: #18bfef;
}
</style>
