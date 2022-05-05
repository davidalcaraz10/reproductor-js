
const audio = document.getElementById("audio");
const playPause = document.getElementById("play");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const range = document.getElementById("range");
const art = document.getElementById("art");
let currentTimeText = document.getElementById("currentTimeText");
let userName;
let nombresDeUsuarios = localStorage.getItem('userLS');


// play-pause y cambio de ícono
playPause.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  }
});

// Barra de progreso
function update() {
  let medidaBarra = parseInt(audio.currentTime*100/audio.duration);
  range.value = medidaBarra;
};
setInterval(update,100);

audio.addEventListener('timeupdate', actualizacionTiempo);
function actualizacionTiempo() {
  let minutosActual = parseInt(audio.currentTime / 60);
  let segundosActual = parseInt(audio.currentTime - minutosActual * 60);
  if (segundosActual < 10) { segundosActual = "0" + segundosActual };
  currentTimeText.innerHTML = minutosActual + ":" + segundosActual;
}


// Botones de velocidad
const speedBtn1 = document.getElementById('speedBtn1');
speedBtn1.addEventListener('click', changeSpeed);
function changeSpeed(e) {
  audio.playbackRate = e.target.value;
}

const speedBtn3 = document.getElementById('speedBtn3');
speedBtn3.addEventListener('click', changeSpeed);
function changeSpeed(e) {
  audio.playbackRate = e.target.value;
}


// Lista de reproducción
const songsList = [
  { image: "https://i.ibb.co/ZS3wRSh/cover.jpg",
    artist: "Disclosure",
    song: "Latch",
    length: "02:55",
    file: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Leo%20-%20Trying.mp3"
  },
  { image: "https://i.pinimg.com/564x/9d/d4/78/9dd47873eb944d93d7f764cd72d26cae.jpg",
    artist: "Doja Cat",
    song: "Say So",
    length: "03:57",
    file: "./audio/DojaCat_SaySo.flac"
  },
  { image: "https://lastfm.freetls.fastly.net/i/u/770x0/95ee2cb59610158832735aeb11ea990c.jpg#95ee2cb59610158832735aeb11ea990c",
    artist: "Dua Lipa",
    song: "Levitating",
    length: "03:23",
    file: "./audio/DuaLipa_Levitating.flac"
  },
  { image: "https://m.media-amazon.com/images/I/51u7aJMtw1L.jpg",
    artist: "Keith Jarrett",
    song: "My Song",
    length: "06:09",
    file: "./audio/KeithJarrett_MySong.flac"
  }
];

const trackList = document.getElementById('trackList');
let htmltrackList = '';
for (const song of songsList) {
  htmltrackList +=`
    <div class="player__album">
      <img src="${song.image}" alt="Album Cover" class="player__img" id="art" loading="lazy"/>
    </div>

    <h2 class="player__song" id="title">${song.song}</h2>
    <h3 class="player__artist" id="artist">${song.artist}</h3>

    <input type="range" value="0" min="0" class="player__level" id="range" />
    <div class="audio-duration">
      <div class="start" id="currentTimeText"></div>
      <div class="end">${song.length}</div>
    </div>

    <audio class="player__audio" controls id="audio">
    <source src="${song.file}" type="audio/mpeg">
    Tu navegador no soporta HTML5
    </audio>
  `
};


/*
forward.addEventListener("click", () => {
  audio.setAttribute("src", )
})
*/



// Imprime cada canción en la playlist
const playList = document.getElementById('playList');
let htmlList = ''
for (const song of songsList) {
  htmlList +=`
    <div class="playlist__style" id="playList">
      <div class="playlist__img">
        <img src="${song.image}" alt="Album Cover">
      </div>
      <div class="playlist__text">
        <h2 class="playlist__song">${song.song}</h2>
        <h3 class="playlist__artist">${song.artist}</h3>
      </div>
      <div>
        <p class="trackMinutes">${song.length}</p>
      </div>
      <audio>
        <source src="${song.file}" type="audio/mpeg">
        Tu navegador no soporta HTML5
      </audio>
    </div>
    `
};
document.getElementById('playList').innerHTML = htmlList;




// Inicio de Sesión
document.getElementById('userForm').addEventListener('submit', formAction);
let user_welcome = document.getElementById('user_welcome');

function formAction(e) {
  userName = document.getElementById('inputUsuario').value;
  let userLS = localStorage.setItem('userLS', userName);
  nombresDeUsuarios = localStorage.getItem('userLS');
}

  if(nombresDeUsuarios == '' || nombresDeUsuarios == null) {
    user_welcome.innerHTML = `<h5 class="player__title">Escuchando ahora</h5>`;
  } else {
    user_welcome.innerHTML = `<h5 class="player__title">Hola ${nombresDeUsuarios}!</h5>`;
  }

  
  let downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.addEventListener("click", () => {
    Toastify({
      text: "Iniciando descarga",
      duration: 2000
      }).showToast();
  })
    