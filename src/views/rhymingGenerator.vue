
<template>
<div class="rhyming">
  <h1>Rhyming Generator</h1>
  <div class="form-group">
  <form action="javascript:RhymeBrainSubmit()">
    <input type=text id="RhymeBrainInput" class="form-control" placeholder="type a word you need to rhyme with">
    <input type=submit value="Rhyme" class="btn">
</form>
</div>
</div>
</template>

<script type="text/javascript">
var RhymeBrainMaxResults = 50;
</script>

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

.btn {
  margin: 0 auto;
}

.form-control:focus {
  width: 100%;
}

input {
  text-transform: uppercase;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  text-align: left;
}
</style>