<template>
  <div id="app">
    	<!-- Header -->
					<header id="header">
						<a href="index.html" class="logo">Song_writr</a>
					</header>

				<!-- Nav -->
					<nav id="nav">
						<ul class="links">
							<li class="active"><a href="/">Home</a></li>
							<li><a href="/mysongs">My Music</a></li>
							<li><a href="/login">Login</a></li>
							<li><a href="/signup">Signup</a></li>
						</ul>
						<ul class="icons">
							<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
							<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
							<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
							<li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
						</ul>
					</nav>

    <router-view/>
    
  </div>
</template>

<style>
</style>
