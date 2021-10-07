let video = document.querySelector(".vid");
const player = document.querySelector('.player');
const progressAll = document.querySelectorAll('.progress');
const bigPlayBtn = document.querySelector(".big-play-icon");
const playBtn = document.querySelector(".play-button");
const progressBar = document.querySelector(".progress-bar");
const volumeBtn = document.querySelector(".volume-button");
const volumeBar = document.querySelector(".volume-bar");
const fullScrBtn = document.querySelector(".fullscreen-button");



let vidLoadProgUpdate = function(){
    let video = document.querySelector(".vid")
    progressBar.setAttribute("max", video.duration);
    }
    vidLoadProgUpdate()
  
  let currentVol = video.volume;
  
  
  function togglePlay() {
    progressBar.setAttribute("max", video.duration);
      if (video.paused) {
        video.play();
        bigPlayBtn.setAttribute("hidden", true);
        playBtn.innerHTML = '<img src="assets/svg/pause.svg" alt="pause-button">';
      } else {
        video.pause();
        bigPlayBtn.removeAttribute("hidden");
        playBtn.innerHTML =
          '<img src="assets/svg/play-button.svg" alt="play-button">';
      }
    }
    
  
    function updateProgress() {
      progressBar.value = video.currentTime;
    }
    
    function updateVid() {
      video.currentTime = progressBar.value;
    }
    
    function volumeUpdate() {
      console.log(volumeBar.value);
      video.volume = volumeBar.value;
      currentVol = video.volume;
      
    }
  
    function updateVolBtn() {
      volumeBar.value = video.volume;
      if (video.volume > 0) {
        volumeBtn.innerHTML =
          '<img src="assets/svg/volume-button.svg" alt="volume-button">';
      } else {
        volumeBtn.innerHTML = '<img src="assets/svg/mute.svg" alt="mute-button">';
      }
      }
    
      function muteVid() {
          if (video.volume > 0) {
            video.volume = 0;
            volumeBar.value = 0;
            volumeBtn.innerHTML = '<img src="assets/svg/mute.svg" alt="mute-button">';
          } else {
            video.volume = currentVol;
            volumeBar.value = currentVol;
            volumeBtn.innerHTML =
              '<img src="assets/svg/volume-button.svg" alt="volume-button">';
          }
        }
        
        function toggleFlScr() {
          console.log("press");
          if (!document.fullscreenElement) {
            player.requestFullscreen();
            fullScrBtn.innerHTML =
              '<img src="assets/svg/fullscreen_exit.svg" alt="fullscreen-exit-button">';
          } else {
            document.exitFullscreen();
            fullScrBtn.innerHTML =
              '<img src="assets/svg/Fullscreen-icon.svg" alt="fullscreen-button">';
          }
        }
  
        function changePlayBackRate(direction) {
    
          if (direction === "speed-up") {
            video.playbackRate -= 0.25;
            
        
          }
          if (direction === "slow-down") {
            video.playbackRate += 0.25;
            
          }
          if (video.playbackRate < 0.25 || video.playbackRate > 2) {
            video.playbackRate = 1;
          }
          
        }




document.addEventListener("keypress", (e) => {
    if (e.code === "Space") {
      togglePlay();
    }
    if (e.key === "m" || e.key === "M") {
      muteVid();
    }
    if (e.key === "<") {
      changePlayBackRate("speed-up");
    }
    if (e.key === ">") {
      changePlayBackRate("slow-down");
    }
    if (e.key === "f" || e.key === "F") {
      toggleFlScr();
    }
    
  });
video.addEventListener("volumechange", updateVolBtn);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
playBtn.addEventListener("click", togglePlay);

bigPlayBtn.addEventListener("click", togglePlay);
volumeBtn.addEventListener("click", muteVid);
volumeBar.addEventListener("mousemove", volumeUpdate);

progressBar.addEventListener("mouseup", updateVid);


fullScrBtn.addEventListener("click", toggleFlScr);
