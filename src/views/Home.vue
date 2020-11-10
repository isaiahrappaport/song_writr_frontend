<template>

  <div class="home">

			
   <!-- Main -->
					<div id="main">

						<!-- Featured Post -->
							<article class="post featured">
								<header class="major">
									
									<h2><a href="#">Where great songwriters<br />
									write songs</a></h2>
									<p>Upload audio, write lyrics, make music.</p>
								</header>
                <h2 class="tip">Today, <br> close your eyes while you sing.</h2>
								<a href="/newsong" class="image main"><img src="images/home.png" alt="" /></a>
								<ul class="actions special">
									<li><a href="/newsong" class="button large">Write a song</a></li>
								</ul>
							</article>

						<!-- all songs -->
							<section class="posts">
								<article v-for="song in songs">
                  <h2>{{song.title}}</h2>
                  <h3>By: {{song.user_id}}</h3>
                  <p>{{song.lyrics}}</p>
                  <button v-on:click="showSong(song)">Listen</button>
								</article>
							</section>
<!-- show song -->
      <dialog id="song-details">
      <form method="dialog">
        <h2>Song info:</h2>
        <h3>{{ currentSong.title }}</h3>
        <p>{{currentSong.audio}}</p>
        <audio controls ref="audio">
  <source v-bind:src="currentSong.audio" type="audio/ogg">
  <source v-bind:src="currentSong.audio" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
  <p> {{ currentSong.lyrics }}</p>
  <p> Suggestions: {{ currentSong.suggestions }}</p>
  <button class="close">Close</button>
  </form>
  </dialog>
</div>
</div>
</template>
									
										
									
									
								



<style>
#song-details {
  border-radius: 20px;
  max-width: 50%;
}
.close {
  margin-left: 9em;
}

.tip {
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 250px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      songs: [],
      currentSong: {},
      users: [],
      profile_picture: "",
    };
  },
  created: function () {
    this.indexSongs();
    this.indexUsers();
  },
  methods: {
    // indexSongs
    indexSongs: function () {
      axios.get("/api/songs").then((response) => {
        console.log("All songs:", response.data);
        this.songs = response.data;
      });
    },
    // showSong
    showSong: function (song) {
      console.log("Show song:", song);
      this.currentSong = song;
      document.querySelector("#song-details").showModal();
      this.$nextTick(() => {
        this.$refs.audio.load();
      });
    },

    // indexUsers
    indexUsers: function () {
      axios.get("/api/users").then((response) => {
        console.log("All users:", response.data);
        this.users = response.data;
      });
    },
  },
};
</script>