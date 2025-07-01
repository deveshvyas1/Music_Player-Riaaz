// console.log('Let Start JS');
let currentSong = new Audio();
let songs;
let songIndex = 0;

// Get references to control elements
let play = document.getElementById("play");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let volumeSlider = document.getElementById("volumeSlider");
let volumeIcon = document.querySelector(".volume-icon");

function updateVolumeIcon(volume) {
    if (volume == 0) {
        volumeIcon.src = "img/icons/volume-mute.svg";
    } else if (volume < 50) {
        volumeIcon.src = "img/icons/volume-low.svg";
    } else {
        volumeIcon.src = "img/icons/volume.svg";
    }
}

function secondToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    // Define the songs list directly since we know what songs are available
    let songs = [
        "Ae Dil Hai Mushkil .mp3",
        "Chaudhary.mp3",
        "O Rangrez.mp3",
        "Piya Ghar Aavenge.mp3",
        "Ye Tune Kya Kiya .mp3"
    ];
    return songs;
}

const playMusic = (track, pause=false) => {
    currentSong.src = "songs/" + track;
    if(!pause){
        currentSong.play();
        play.src = "img/icons/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track).replace('.mp3', '');
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    
    // Update the current song index
    songIndex = songs.indexOf(track);
    
    // Set volume from slider
    currentSong.volume = volumeSlider.value / 100;
}

async function main() {


    // Get the list of all the songs
    songs = await getSongs()
    playMusic(songs[0], true)
    // console.log(songs);

    // Show all the songs in the Playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        let displayName = song.replace('.mp3', '').replace(/%20/g, ' ');
        songUL.innerHTML = songUL.innerHTML + `<li data-song="${song}"> 
       
                        <img src="img/icons/music.svg" alt="music">
                        <div class="info">
                            <div>${displayName}</div>
                            <div>Devesh</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img src="img/icons/play.svg" alt="">
                        </div> </li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let songFile = e.getAttribute("data-song");
            console.log("Playing song:", songFile);
            playMusic(songFile);
        })
    })

    // Attach an event listener to play and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/icons/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "img/icons/play.svg";
        }
    })

    // listen for timeupdate event 
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondToMinutesSeconds(currentSong.currentTime)} / ${secondToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".pointer").style.left = (currentSong.currentTime / currentSong.duration)*100 + "%";
    })

    // Add error handling for audio
    currentSong.addEventListener("error", (e) => {
        console.error("Error loading audio:", e);
        alert("Error loading audio file. Please check if the file exists.");
    });

    currentSong.addEventListener("loadeddata", () => {
        console.log("Audio loaded successfully");
    });
    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
       document.querySelector(".pointer").style.left = percent + "%";
       currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })
    // Add an event listener for hamburger
    document.querySelector(".ham").addEventListener("click", ()=>{
        document.querySelector(".left-block").style.left = "0";
    })
    // Add an event listener for cross button
    document.querySelector(".cross").addEventListener("click", ()=>{
        document.querySelector(".left-block").style.left = "-120%";
    })

    // add Event listener for next and previous
    previous.addEventListener("click", ()=> {
        console.log("Previous clicked");
        if((songIndex-1) >= 0){
            playMusic(songs[songIndex-1]);
        }
    })
    
    next.addEventListener("click", () =>{
        console.log('Next clicked');
        if((songIndex+1) < songs.length ){
            playMusic(songs[songIndex+1]);
        }
    })

    // Add event listener for volume control
    volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value;
        currentSong.volume = volume / 100;
        updateVolumeIcon(volume);
        console.log("Volume set to:", volume + "%");
    });

    // Set initial volume and icon
    currentSong.volume = volumeSlider.value / 100;
    updateVolumeIcon(volumeSlider.value);

    // Add click event to volume icon for mute/unmute
    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            // Mute
            volumeIcon.dataset.previousVolume = volumeSlider.value;
            volumeSlider.value = 0;
            currentSong.volume = 0;
            updateVolumeIcon(0);
        } else {
            // Unmute
            const previousVolume = volumeIcon.dataset.previousVolume || 50;
            volumeSlider.value = previousVolume;
            currentSong.volume = previousVolume / 100;
            updateVolumeIcon(previousVolume);
        }
    });

}

main()

