<template>
  <div class="home">
    <!-- indexSongs -->
    <h1>All Songs:</h1>
    <div v-for="song in songs">
      <h2>{{song.title}}</h2>
      <h3>By: {{song.user_id}}</h3>
      <h4>Audio: {{song.audio}}</h4>
      <p>Lyrics: {{song.lyrics}}</p>
      <button v-on:click="showSong(song)">Listen</button>
      <br>
      <br>
      <br>
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