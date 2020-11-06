<template>

  <div class="home">
    <!-- indexSongs -->
    
    <h1>Welcome, {{currentUser.username}}!</h1>
    <a class="new-song" href="/newsong">New Song</a>
    <h1>All Songs</h1>
    <div v-for="song in currentUser.songs" class="all-songs">
      <!-- show all user songs -->
      <h2>{{song.title}}</h2>
      <h3>By: {{song.user_id}}</h3>
      <h5>Created at:{{song.created_at}}</h5>
      <button v-on:click="showSong(song)">Listen</button>
    </div>

<!-- showSong -->
      
      <dialog id="song-details">
      <form method="dialog">
        <h2>Song info:</h2>
        <h3>{{ currentSong.title }}</h3>
        <!-- PLAYING AUDIO NOT WORKING -->
         <audio controls>
  <source v-bind:src="currentSong.audio_file" type="audio/ogg">
  <source v-bind:src="currentSong.audio_file" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
        <p> {{ currentSong.lyrics }}</p>
        <p> {{ currentSong.suggestions }}</p>
        <button>Close</button>
      </form>
    </dialog>

  </div>
</template>

<style scoped>
.new-song {
  background-color: aliceblue;
  border: solid black 2px;
  border-radius: 20px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  padding: 6px;
}

.new-song:hover {
  background-color: rgb(219, 215, 215);
}

header {
  background: white;
}

body {
  background-color: rgb(252, 191, 78);
}
.all-songs {
  padding: 30px;
  background: white;
  border-radius: 20px;
  width: 20%;
  margin: 0 auto;
  margin: 20px auto;
}

.all-songs:hover {
  background-color: cornsilk;
}

#song-details {
  color: rgb(0, 0, 0);
  border: solid rgb(231, 209, 137) 2px;
  border-radius: 20px;
}

button {
  border-radius: 20px;
  font-size: 16px;
  border: solid rgb(252, 191, 78) 1px;
  background-color: white;
  color: black;
}

button:hover {
  background-color: aliceblue;
  cursor: pointer;
  font-size: 20px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      songs: [],
      currentSong: {},
      currentUser: [],
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