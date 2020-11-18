<template>
<div id="recording">
    <div class="wrapper">

      <header>
        <h1>Make_Music🎙</h1>
      </header>

      <section class="main-controls">
        <canvas class="visualizer" height="60px" width="450px"></canvas>
        <div id="buttons">
          <button class="record"></button>
          <button class="stop">Stop</button>
        </div>
      </section>
      <br>
      <section class="sound-clips">


      </section>

    </div>

</div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#recording {
  max-width: 72rem;
  margin: 0 auto;
  padding-left: 20em;
  padding-right: 20em;
  background-color: white;
  padding-bottom: 2em;
}

html,
body {
  height: 100%;
}

body {
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-size: 0.8rem;
}

.record {
  width: 50px !important;
  height: 50px;
  border-radius: 50%;
  color: white !important;
  background: rgb(99, 10, 28);
  background: linear-gradient(90deg, rgba(99, 10, 28, 1) 0%, rgba(163, 12, 42, 1) 51%, rgba(255, 0, 54, 1) 100%);
  box-shadow: none;
}

.record:hover {
  background: rgb(99, 10, 28);
  background: linear-gradient(-90deg, rgba(99, 10, 28, 1) 0%, rgba(163, 12, 42, 1) 51%, rgba(255, 0, 54, 1) 100%);
  box-shadow: none;
}

.record:focus {
  background: rgb(99, 10, 28);
  background: linear-gradient(-90deg, rgba(99, 10, 28, 1) 0%, rgba(163, 12, 42, 1) 51%, rgba(255, 0, 54, 1) 100%);
}

.stop {
  color: white !important;
  background: rgb(18, 10, 99);
  background: linear-gradient(90deg, rgba(18, 10, 99, 1) 0%, rgba(41, 12, 163, 1) 51%, rgba(0, 209, 255, 1) 100%);
  box-shadow: none;
}

.stop:hover {
  background: rgb(18, 10, 99);
  background: linear-gradient(-90deg, rgba(18, 10, 99, 1) 0%, rgba(41, 12, 163, 1) 51%, rgba(0, 209, 255, 1) 100%);
  box-shadow: none;
}

.stop:focus {
  background: rgb(18, 10, 99);
  background: linear-gradient(-90deg, rgba(18, 10, 99, 1) 0%, rgba(41, 12, 163, 1) 51%, rgba(0, 209, 255, 1) 100%);
  box-shadow: none;
}

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

h1,
h2 {
  margin-top: 20px;
  color: black;
  font-size: 3.5rem;
  text-align: center;
  font-weight: normal;
  padding: 0.5rem 0 0 0;
}

.main-controls {
  padding: 0.5rem 0;
}

canvas {
  display: block;
  margin-bottom: 0.5rem;
}

#buttons {
  width: 30%;
  margin: 0 auto;
  margin-top: 5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#buttons button {
  font-size: 1rem;
  /* padding: 1rem; */
  width: calc(50% - 0.25rem);
}

button {
  font-size: 1rem;
  background: #0088cc;
  text-align: center;
  color: white;
  border: none;
  transition: all 0.2s;
  /* padding: 0.5rem; */
}

/* button:hover,
button:focus {
  box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 1);
  background: #0ae;
} */

/* button:active {
  box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.5);
  transform: translateY(2px);
} */

/* Make the clips use as much space as possible, and
 * also show a scrollbar when there are too many clips to show
 * in the available space */
.sound-clips {
  flex: 1;
  overflow: auto;
}

section,
article {
  display: block;
}

.clip {
  padding-bottom: 1rem;
}

audio {
  width: 100%;
  display: block;
  margin: 1rem auto 0.5rem;
}

.clip p {
  display: inline-block;
  font-size: 1rem;
}

.clip button {
  font-size: 1rem;
  float: right;
}

button.delete {
  margin: 0 auto;
  background-color: #f00 !important;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
}

/* Checkbox hack to control information box display */

label {
  font-size: 3rem;
  position: absolute;
  top: 2px;
  right: 3px;
  z-index: 5;
  cursor: pointer;
  background-color: black;
  border-radius: 10px;
}

input[type="checkbox"] {
  position: absolute;
  top: -100px;
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  transition: 0.3s all ease-out;
  background-color: #efefef;
  padding: 1rem;
}

aside p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

aside a {
  color: #666;
}

/* Toggled State of information box */
input[type="checkbox"]:checked ~ aside {
  transform: translateX(0);
}

/* Cursor when clip name is clicked over */

.clip p {
  cursor: pointer;
}

.visualizer {
  border-radius: 20px;
  margin-top: 50px;
}

/* Adjustments for wider screens */
@media all and (min-width: 800px) {
  /* Don't take all the space as readability is lost when line length
     goes past a certain size */
  .wrapper {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>

<script>
export default {
  mounted: function () {
    // set up basic variables for app

    const record = document.querySelector(".record");
    const stop = document.querySelector(".stop");
    const soundClips = document.querySelector(".sound-clips");
    const canvas = document.querySelector(".visualizer");
    const mainSection = document.querySelector(".main-controls");

    // disable stop button while not recording

    stop.disabled = true;

    // visualiser setup - create web audio api context and canvas

    let audioCtx;
    const canvasCtx = canvas.getContext("2d");

    //main block for doing the audio recording

    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };
      let chunks = [];

      let onSuccess = function (stream) {
        const mediaRecorder = new MediaRecorder(stream);

        visualize(stream);

        record.onclick = function () {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";

          stop.disabled = false;
          record.disabled = true;
        };

        stop.onclick = function () {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          record.style.background = "";
          record.style.color = "";
          // mediaRecorder.requestData();

          stop.disabled = true;
          record.disabled = false;
        };

        mediaRecorder.onstop = function (e) {
          console.log("data available after MediaRecorder.stop() called.");

          const clipName = prompt("Enter a name for your sound clip?", "My unnamed clip");

          const clipContainer = document.createElement("article");
          const clipLabel = document.createElement("p");
          const audio = document.createElement("audio");
          const deleteButton = document.createElement("button");

          clipContainer.classList.add("clip");
          audio.setAttribute("controls", "");
          deleteButton.textContent = "Delete";
          deleteButton.className = "delete";

          if (clipName === null) {
            clipLabel.textContent = "My unnamed clip";
          } else {
            clipLabel.textContent = clipName;
          }

          clipContainer.appendChild(audio);
          clipContainer.appendChild(clipLabel);
          clipContainer.appendChild(deleteButton);
          soundClips.appendChild(clipContainer);

          audio.controls = true;
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          console.log("recorder stopped");

          deleteButton.onclick = function (e) {
            let evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          };

          clipLabel.onclick = function () {
            const existingName = clipLabel.textContent;
            const newClipName = prompt("Enter a new name for your sound clip?");
            if (newClipName === null) {
              clipLabel.textContent = existingName;
            } else {
              clipLabel.textContent = newClipName;
            }
          };
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
      };

      let onError = function (err) {
        console.log("The following error occured: " + err);
      };

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }

    function visualize(stream) {
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }

      const source = audioCtx.createMediaStreamSource(stream);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      //analyser.connect(audioCtx.destination);

      draw();

      function draw() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0, 0, 0)";

        canvasCtx.beginPath();

        let sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0;
          let y = (v * HEIGHT) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }
    }

    window.onresize = function () {
      canvas.width = mainSection.offsetWidth;
    };

    window.onresize();
  },
};
</script>