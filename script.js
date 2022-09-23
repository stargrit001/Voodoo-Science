console.log("Welcome to Spotify");

//Initializing variables
let songIndex = 0;
let audioElement = new Audio('DE_GORRLAUSE_Voodoo_Science_(Master_24_48)_192_44.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "De Gorrlause - Voodoo Science", filePath: "song1.mp3", cover: "cover1.png"},
    {songName: "De Gorrlause - The 4th take", filePath: "song2.mp3", cover: "cover2.png"},
   
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].cover;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        songItemPlayFn(songIndex);
    }
    else{
        songItemPauseFn(songIndex);
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    if (progress>=100){
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        nextSong();
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        songItemPlayFn(songIndex);
    })
})

function songItemPlayFn(songIndex){
    let songItemPlay = document.getElementById(songIndex);
    songItemPlay.classList.remove('fa-play-circle');
    songItemPlay.classList.add('fa-pause-circle');
    if((!(audioElement.paused)) || (myProgressBar.value>=100)){
        audioElement.src = `song${songIndex+1}.mp3`;
    }
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

function songItemPauseFn(songIndex){
    let songItemPause = document.getElementById(songIndex);
    songItemPause.classList.remove('fa-pause-circle');
    songItemPause.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}

document.getElementById("next").addEventListener("click", ()=>{
    nextSong();
})

document.getElementById("previous").addEventListener("click", ()=>{
    makeAllPlays();
    if(songIndex<=0){
        songIndex = 2;
    }
    else{
        songIndex -= 1;
    }
    songItemPlayFn(songIndex);
})

function nextSong(){
    makeAllPlays();
    if(songIndex>=2){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    songItemPlayFn(songIndex);
}
