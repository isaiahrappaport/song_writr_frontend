<template>
  <div class="home">
    <!-- indexSongs -->
    <div id="main">
      <br>
      <h1 class="welcome">Welcome, {{ currentUser.username }}!</h1>
      <a class="new-song" href="/newsong">New Song 🎵</a>
      <img class="top-profile-picture" v-bind:src="currentUser.profile_picture" v-bind:alt="currentUser.username" />
      <h2>My Songs</h2>
      <hr>
      <section class="posts">
        <article v-for="song in currentUser.songs" class="all-songs">
          <img class="profile-picture" v-bind:src="currentUser.profile_picture" v-bind:alt="currentUser.username" />
          <h2>{{ song.title }}</h2>
          <h3>By: {{ currentUser.username }}</h3>
          <!-- <small>{{ song.genre }}</small> -->
          <!-- <h5>Created at:{{ song.created_at }}</h5> -->
          <button v-on:click="showSong(song)">Listen</button>
        </article>
      </section>

      <!-- showSong -->

      <dialog id="song-details">
        <form method="dialog">
          <h2>{{ currentSong.title }}</h2>
          <img class="profile-picture-show" v-bind:src="currentSong.profile_picture" v-bind:alt="currentSong.username" />
          <audio controls ref="audio">
            <source v-bind:src="currentSong.audio" type="audio/ogg" />
            <source v-bind:src="currentSong.audio" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p> <span class="lyrics">Lyrics:</span> {{ currentSong.lyrics }}</p>
         <h4>Suggestions ({{currentSong.suggestions.length}}): </h4> 
           <div v-for="suggestion in currentSong.suggestions"> 
            <span class="username">{{suggestion.username}}:</span> {{suggestion.text}}
          </div>
          <button class="close">Close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style scoped>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}

.welcome {
  margin-right: 20px;
}

.top-profile-picture {
  width: 15%;
  position: relative;
  margin: 0 auto;
  margin-left: 31em;
}

.profile-picture {
  width: 10%;
  margin: 0 auto;
}

.profile-picture-show {
  position: relative;
  width: 10%;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: -70px;
  border-radius: 50%;
  max-height: 65px;
  max-width: 10%;
}

h1 {
  font-size: 20px;
  text-align: right;
}

h2 {
  text-align: center;
}

.new-song {
  margin-left: 76em;
  /* margin-right: 140em; */
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

.close {
  margin: 0 auto;
  margin-left: 43%;
  margin-right: 50%;
}

.lyrics {
  font-weight: bold;
}

audio {
  outline: none;
  width: 80%;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      songs: [],
      currentSong: {
        suggestions: [
          {
            text: "",
          },
        ],
      },
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
      this.$nextTick(() => {
        this.$refs.audio.load();
      });
    },
  },
};
</script>
