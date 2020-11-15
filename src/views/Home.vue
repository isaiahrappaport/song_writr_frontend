<template>
  <div class="home">
    <!-- Main -->
    <div id="main">
      <!-- Featured Post -->
      <article class="post featured">
        <header class="major">
          <h2>
            <a href="#">
              Where great songwriters
              <br />
              write songs
            </a>
          </h2>
          <p>Upload audio, write lyrics, make music.</p>
        </header>
        <h2 class="tip">
          Today,
          <br />
          close your eyes while you sing.
        </h2>
        <a href="/newsong" class="image main"><img src="images/home.png" alt="" /></a>
        <ul class="actions special">
          <li><a href="/newsong" class="button large">Write a song</a></li>
        </ul>
      </article>

      <!-- all songs -->
      <section class="posts">
        <article v-for="song in songs">
          <img class="profile-picture" v-bind:src="song.profile_picture" v-bind:alt="song.username" />
          <h2>{{ song.title }}</h2>
          <h3>By: {{ song.username }}</h3>
          <button v-on:click="showSong(song)">Listen</button>
        </article>
      </section>
      <!-- show song -->
      <dialog id="song-details">
        <form method="dialog">
          <h2>Song info:</h2>
          <img class="profile-picture" v-bind:src="currentSong.profile_picture" v-bind:alt="currentSong.username" />
          <h3>{{ currentSong.title }}</h3>
          <audio controls ref="audio">
            <source v-bind:src="currentSong.audio" type="audio/ogg" />
            <source v-bind:src="currentSong.audio" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p>Lyrics: {{ currentSong.lyrics }}</p>
          <h4>Suggestions ({{currentSong.suggestions.length}}): </h4>
          <div v-for="suggestion in currentSong.suggestions">
            <span class="username">{{suggestion.username}}:</span> {{suggestion.text}}
          </div>
          <br>
          <div class="form-group">
          <form v-on:submit.prevent="submit()">
            <!-- ask if v-on:submit or v-on:click -->
            <!-- fix addComments function -->
            <input type="text" class="form-control" placeholder="Make a suggestion...">
            <input type="submit" class="btn btn-primary" value="Submit">
          </form>
          </div>
            <br>
          <button class="close">Close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style>
.username {
  font-weight: bold;
}

.profile-picture {
  width: 30%;
  margin: 0 auto;
}

.tip {
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 250px;
}
#song-details {
  border-radius: 20px;
  max-width: 50%;
}

button {
  outline: none;
}

.close {
  margin-left: 9em;
}

audio {
  outline: none;
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

    // createSuggestion
    submit: function () {
      var params = {
        text: this.text,
        username: this.currentSong.username,
        song_id: this.currentSong.id,
      };
      axios.post("/api/suggestions", params).then((response) => {
        console.log("Suggestion Submitted!", response.data);
      });
    },
  },
};
</script>
