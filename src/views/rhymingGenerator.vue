<template>
  <div class="rhyming">
    <h1 class="title">Rhyming Generator</h1>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="type a word you need to rhyme with..." v-model="word" />
      <button v-on:click="indexRhymes()" class="btn btn-primary">Submit</button>
    </div>

    <div class="rhymes" v-for="word in words">
      <small class="individual-rhymes">{{ word.word }}</small>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.form-group {
  text-align: center;
}

.rhyming {
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

.rhymes {
  margin: 0 auto;
  text-align: center;
  margin-top: 2em;
}

.form-control:hover {
  width: 100%;
}

input {
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
      word: "",
      words: [],
    };
  },
  created: function () {},
  methods: {
    indexRhymes: function () {
      axios.get("/api/rhymes/" + this.word).then((response) => {
        console.log("Rhymes:", response.data);
        this.words = response.data;
      });
    },
  },
};
</script>
