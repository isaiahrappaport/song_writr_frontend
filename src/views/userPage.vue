<template>

  <div class="home">
    <!-- indexSongs -->
    <div id="main">
    
    <h1>Welcome, {{currentUser.username}}!</h1>
    <audio controls v-if="currentUser.songs">
      <source v-bind:src="currentUser.songs[currentUser.songs.length - 1].audio_file">
      Your browser does not support the audio element.
    </audio>
    <a class="new-song" href="/newsong">New Song</a>
    <h1>All Songs</h1>
      <!-- show all user songs -->
      <section class="posts">
    <article v-for="song in currentUser.songs" class="all-songs">
      <h2>{{song.title}}</h2>
      <h3>By: {{song.user_id}}</h3>
      <h5>Created at:{{song.created_at}}</h5>
      <button v-on:click="showSong(song)">Listen</button>
    </article>
      </section>
    

<!-- showSong -->
      
      <dialog id="song-details">
      <form method="dialog">
        <h2>Song info:</h2>
        <h3>{{ currentSong.title }}</h3>
        <!-- PLAYING AUDIO NOT WORKING -->
         <audio controls>
          <source v-bind:src="currentSong.audio_file">
          Your browser does not support the audio element.
        </audio>
        <p> {{ currentSong.lyrics }}</p>
        <p> {{ currentSong.suggestions }}</p>
        <button>Close</button>
      </form>
    </dialog>

  </div>
  </div>
</template>

<style scoped>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      songs: [],
      currentSong: {},
      currentUser: {},
    };
  },
  created: function () {
    this.userSongs();
  },
  methods: {
    // currentUser
    userSongs: function () {
      axios.get("/api/users/current").then((response) => {
        console.log("current user:", response.data);
        this.currentUser = response.data;
      });
    },
    // showSong
    showSong: function (song) {
      console.log("Show song:", song);
      this.currentSong = song;
      document.querySelector("#song-details").showModal();
    },
  },
};
</script>