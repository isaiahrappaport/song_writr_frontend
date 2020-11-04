<template>

  <div class="home">
    <!-- indexSongs -->
    <h1>All Songs</h1>
    <div v-for="song in songs" class="all-songs">
      <h2>{{song.title}}</h2>
      <h3>By: {{song.user_id}}</h3>
      <h4>Audio: {{song.audio}}</h4>
      <p>Lyrics: {{song.lyrics}}</p>
      <button v-on:click="showSong(song)">Listen</button>
    </div>

<!-- showSong -->
      
      <dialog id="song-details">
      <form method="dialog">
        <h2>Song info:</h2>
        <h3>{{ currentSong.title }}</h3>
        <p> {{ currentSong.audio }}</p>
        <p> {{ currentSong.lyrics }}</p>
        <p> {{ currentSong.suggestions }}</p>
        <button>Close</button>
      </form>
    </dialog>

  </div>
</template>

<style>
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
    };
  },
  created: function () {
    this.indexSongs();
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
    },
  },
};
</script>