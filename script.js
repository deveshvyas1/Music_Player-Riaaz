// console.log('Let Start JS');
let currentSong = new Audio();
let songs;
let currFolder;

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

async function getSongs(folder) {
    currFolder = folder;
    // let a = await fetch(`http://192.168.1.9:3000/${folder}/`)
    let a = await fetch(`${folder}`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // Show all the songs in the Playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
       
                        <img src="img/icons/music.svg" alt="music">
                        <div class="info">
                            <div>${song.replaceAll("%20", " ")}</div>
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
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    // return songs
    // return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    // let a = await fetch(`http://192.168.1.9:3000/songs/`)
    let a = await fetch(`songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".second-line")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
            // get the metadata of the folder
            // let a = await fetch(`http://192.168.1.9:3000/songs/${folder}/info.json`)
            let a = await fetch(`songs/${folder}/info.json`)
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="artist">
                <img src="/songs/${folder}/cover.png" alt="">
                <h4>${response.title}</h4>
                <h6>${response.Description}</h6>
            </div>`;

        }
    }

    // Load the playlist whenever artist is clicked
    Array.from(document.getElementsByClassName("artist")).forEach(e => {
        e.addEventListener("click", async item => {
            // let folder = item.currentTarget.dataset.folder;
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        });
    });

}

async function main() {
    // Get the list of all the songs
    await getSongs("songs/ncs")
    playMusic(songs[0], true)
    // console.log(songs);

    // Display all the albums of artist on the page
    displayAlbums()

    // Attach an event listener to play and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // listen for timeupdate event 
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondToMinutesSeconds(currentSong.currentTime)} / ${secondToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".pointer").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".pointer").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })
    // Add an event listener for hamburger
    document.querySelector(".ham").addEventListener("click", () => {
        document.querySelector(".left-block").style.left = "0";
    })
    // Add an event listener for cross button
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left-block").style.left = "-120%";
    })

    // add Event listener for next and previous
    previous.addEventListener("click", () => {
        // console.log("Previous clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })
    next.addEventListener("click", () => {
        // console.log('Next clicked');

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // Add an event to volume 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",
        (e) => {
            // console.log("setting volume to", e.target.value);
            currentSong.volume = parseInt(e.target.value) / 100;
        })

    // add event to mute the track 
    document.querySelector(".volume>img").addEventListener("click", e =>{
        console.log(e.target);
        if(e.target.src.includes ("img/icons/volume.svg")) {
            console.log(e.target.src)
            e.target.src = e.target.src.replace("img/icons/volume.svg", "img/icons/mute.svg")
            currentSong.volume = 0;
             document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("img/icons/mute.svg", "img/icons/volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
        
    })


}

main()

