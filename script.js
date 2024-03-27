console.log('lets build a music player');
let currentSong = new Audio();
let songs;
// seconds to minutes/second converter
function secondsToMinuteConverter(seconds) {
  if(isNaN(seconds||seconds<0)){
    return "00:00"
  }
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  
  return { minutes, remainingSeconds };
}
/* Example usage:
let totalSeconds = 123;
console.log(formatTime(totalSeconds)); // Output: "02:03"*/

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement('div');
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  console.log(as);
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
// play the music
const playMusic = (track,pause= false)=>{
  // let audio = new Audio();
  currentSong.src = "/songs/"+track;
  if(!pause){
 currentSong.play();
 play.src = "pause.svg";
  }
 
 document.querySelector('.songinfo').innerHTML = decodeURI(track);
 document.querySelector('.songtime').innerHTML = "00:00 / 00:00";
}

async function main(){
  
  // get all songs
 songs =  await getSongs();
  playMusic(songs[0],true);
// Show all the songs in the playlist
let songUL = document.querySelector(".songList").getElementsByTagName('ul')[0];
for (const song of songs) {
  songUL.innerHTML = songUL.innerHTML+`
  <li>
  <img class="invert" src="music.svg" alt="">
  <div class="info">
    <div>${song.replaceAll("%20"," ")}</div>
    <div>Abhishek</div>
  </div>
  <div class="playnow">
    <span>Play Now</span>
    <img class="invert" src="play.svg" alt="">
  </div>
</li>
  `;
}
// Attach an event listener on first song
Array.from(document.querySelector('.songList').getElementsByTagName("li")).forEach((e)=>{
  e.addEventListener("click",()=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
  })
})
// Attach a even listener at play,prev,next
let play = document.getElementById("play");
play.addEventListener("click",()=>{
  if(currentSong.paused){
    currentSong.play();
    play.src = "pause.svg";
  }else{
    currentSong.pause();
    play.src = "play.svg";
  }
})
// listen for timeupdate event
// listen for timeupdate event
currentSong.addEventListener("timeupdate", () => {
  console.log(currentSong.currentTime, currentSong.duration);
  let currentTime = secondsToMinuteConverter(Math.floor(currentSong.currentTime));
  let totalDuration = secondsToMinuteConverter(Math.floor(currentSong.duration));
  document.querySelector(".songtime").innerHTML = `${currentTime.minutes}:${String(currentTime.remainingSeconds).padStart(2, '0')} / ${totalDuration.minutes}:${String(totalDuration.remainingSeconds).padStart(2, '0')}`;
  document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100+ "%";
});
// Add a event listener to a seekbar
document.querySelector('.seekbar').addEventListener("click",(e)=>{
  let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
  document.querySelector(".circle").style.left = percent +"%";
  currentSong.currentTime  = ((currentSong.duration)*percent)/100;
})
// Adding a event listener for a hamburger
document.querySelector(".hamburgerContainer").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});
// Adding a event listener for a close button
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-118%";
});
// Add a event listener to prev & next
prev.addEventListener("click",()=>{
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
  console.log(songs,index);
  if((index-1)>=0){
  playMusic(songs[index-1])
  }
})
next.addEventListener("click",()=>{
  console.log("next clicked");
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
  if((index+1)<songs.length-1){
  playMusic(songs[index+1])
  }
})
}
main();
  
  // 