<template>
  <div class="home">
    
    <!-- Main -->
    <div id="main">
      <!-- Featured Post -->
      <article class="post featured">
        <header class="major">
          <h2>
              Where great songwriters
          </h2>
  
          <h2 class="opening-title">
              write great songs </h2>
          <p>Upload audio, write lyrics, make music.</p>
        </header>
        <h2 class="tip">
          Music is the <br/>expression <br/> of the soul.
        </h2>
        <a href="/newsong" class="image main"><img src="images/home.png" alt="" /></a>
        <ul class="actions special">
          <li><a href="/newsong" class="button large">Write a song</a></li>
        </ul>
      </article>

      <!-- all songs -->
      <h2 class="all-songs">All Songs:</h2>
      <br>
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
          <h2>{{ currentSong.title }}</h2>
          <img class="profile-picture-show" v-bind:src="currentSong.profile_picture" v-bind:alt="currentSong.username" />
          <audio controls ref="audio">
            <source v-bind:src="currentSong.audio" type="audio/ogg" />
            <source v-bind:src="currentSong.audio" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p> <span class="lyrics">Lyrics:</span> <span> {{ currentSong.lyrics }}</span> </p>
          <h4>Suggestions ({{currentSong.suggestions.length}}): </h4> 
           <div v-for="suggestion in currentSong.suggestions"> 
            <span class="username">{{suggestion.username}}:</span> {{suggestion.text}}
          </div>
          <br>
          <div class="form-group">
          <form v-on:submit.prevent="submit()">
            <input type="text" class="form-control" placeholder="Make a suggestion..." v-model="suggestionText">
          
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
.opening-title {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid #18bfef; /* The typwriter cursor */
  white-space: nowrap; /*Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #18bfef;
  }
}

.lyrics {
  font-weight: bold;
}

.all-songs {
  margin: 0 auto;
  text-align: center;
}

h2 {
  white-space: nowrap;
}

.username {
  font-weight: bold;
}

.profile-picture {
  width: 30%;
  margin: 0 auto;
  border-radius: 50%;
  max-height: 140px;
  max-width: 30%;
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

.tip {
  position: absolute;
  top: 65vh;
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

.btn-primary {
  margin-left: 45em;
  margin-top: 10px;
}

.close {
  margin: 0 auto;
  margin-left: 43%;
  margin-right: 50%;
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
      suggestionText: "",
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
        text: this.suggestionText,
        username: this.currentSong.username,
        song_id: this.currentSong.id,
      };
      axios.post("/api/suggestions", params).then((response) => {
        console.log("Suggestion Submitted!", response.data);
        this.currentSong.suggestions.push(response.data);
        this.suggestionText = "";
      });
    },
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
