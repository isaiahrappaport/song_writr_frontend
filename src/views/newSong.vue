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
        <textarea name="lyrics" rows="10" cols="30" v-model="lyrics" placeholder="Type genius lyrics here.">
        </textarea>
      </div>
      <br>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.form-group {
  text-align: center;
}

.new-song {
  max-width: 72rem;
  margin: 0 auto;
  padding-left: 20em;
  padding-right: 20em;
  background-color: white;
  padding-bottom: 2em;
}
.form-control {
  width: 50%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px;
  padding: 1px 20px 12px 40px;
  transition: width 0.7s ease-in-out;
  margin: 20px;
  margin-left: 7.5em;
}

.btn {
  margin: 0 auto;
  margin-left: 40%;
  margin-right: 50%;
}

.form-control:focus {
  width: 100%;
}

input,
textarea,
select {
  text-transform: uppercase;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  text-align: left;
  box-shadow: 8px 4px #beb9b9;
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