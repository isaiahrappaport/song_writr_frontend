<template>
  <div class="new-song">
    <form v-on:submit.prevent="submit()">
      <h1>New Song 🎵</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label> 
        <input type="text" class="form-control" v-model="title">
      </div>
      <br>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <select id="genre" name="genre" v-model="genre">
        <option value="pick">pick a genre</option>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="folk">Folk</option>
        <option value="blues">Blues</option>
        </select>
      </div>
      <br>
      <div class="form-group">
        <label>Audio:</label>
        <input type="file" v-on:change="setFile($event)" ref="fileInput">
      </div>
      <br>
      <div class="form-group">
        <label>Lyrics:</label>
        <textarea name="lyrics" rows="10" cols="30" v-model="lyrics">
         Type genius lyrics here.
        </textarea>
      </div>
      <br>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 1em;
}
.new-song {
  background-color: rgb(255, 255, 255);
  /* border: solid black 2px; */
  /* border-radius: 20px; */
  text-decoration: none;
  color: black;
  font-size: 16px;
  padding: 6px;
  text-align: center;
  margin-left: 4.5em;
  margin-right: 4.5em;
}

/* .new-song:hover {
  font-size: 18px;
  background-color: rgb(85, 83, 83);
  color: rgb(252, 191, 78);
  border: solid white 2px;
} */

.btn {
  border-radius: 20px;
}

.btn:hover {
  cursor: pointer;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      title: "",
      genre: "",
      audio_file: "",
      lyrics: "",
      errors: [],
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.audio_file = event.target.files[0];
      }
    },
    submit: function () {
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("audio_file", this.audio_file);
      formData.append("genre", this.genre);
      formData.append("lyrics", this.lyrics);

      axios
        .post("/api/songs", formData)
        .then((response) => {
          this.title = "";
          this.genre = "";
          this.lyrics = "";
          this.$refs.fileInput.value = "";
          this.$router.push("/mysongs");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>