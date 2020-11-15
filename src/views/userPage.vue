<template>
  <div class="home">
    <!-- indexSongs -->
    <div id="main">
      <h1>Welcome, {{ currentUser.username }}!</h1>
      <a class="new-song" href="/newsong">New Song 🎵</a>
      <h2>All Songs</h2>
      <section class="posts">
        <article v-for="song in currentUser.songs" class="all-songs">
          <img class="profile-picture" v-bind:src="currentUser.profile_picture" v-bind:alt="currentUser.username" />
          <h2>{{ song.title }}</h2>
          <h3>By: {{ currentUser.username }}</h3>
          <h5>Created at:{{ song.created_at }}</h5>
          <button v-on:click="showSong(song)">Listen</button>
        </article>
      </section>

      <!-- showSong -->

      <dialog id="song-details">
        <form method="dialog">
          <h2>Song info:</h2>
          <h3>{{ currentSong.title }}</h3>
          <audio controls ref="audio">
            <source v-bind:src="currentSong.audio_file" />
            Your browser does not support the audio element.
          </audio>
          <p>Lyrics: {{ currentSong.lyrics }}</p>
          <p>{{ currentSong.suggestions }}</p>
          <button class="close">Close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style scoped>
.profile-picture {
  width: 30%;
  margin: 0 auto;
}

h1 {
  font-size: 20px;
  text-align: right;
}

h2 {
  text-align: center;
}

.new-song {
  margin-left: 40em;
  margin-bottom: 3em;
  border: solid black 2px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-block;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.075em;
  height: 3rem;
  line-height: 3rem;
  padding: 0 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
}

.new-song:hover {
  border: solid #18bfef 2px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      songs: [],
      currentSong: {},
      currentUser: {},
    };
  },
  created: function() {
    this.userSongs();
  },
  methods: {
    // currentUser
    userSongs: function() {
      axios.get("/api/users/current").then(response => {
        console.log("current user:", response.data);
        this.currentUser = response.data;
      });
    },
    // showSong
    showSong: function(song) {
      console.log("Show song:", song);
      this.currentSong = song;
      document.querySelector("#song-details").showModal();
      this.$nextTick(() => {
        this.$refs.audio.load();
      });
    },
  },
};
</script>
