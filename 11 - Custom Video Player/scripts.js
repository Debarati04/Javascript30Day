// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.player__button');
const ranges = player.querySelectorAll('.player__slider');

// Build our functions

function togglePLay(){
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipPlay(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleUpdate(){
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgressBar(){
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;

}

// Hook up the event listeners

video.addEventListener('click', togglePLay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgressBar);

toggle.addEventListener('click', togglePLay);

skipButtons.forEach(button => button.addEventListener('click', skipPlay));
ranges.forEach(range => range.addEventListener('change', handleUpdate));


//progress.addEventListener('click', scrub);


let mousedown = false;
// Mousemove option 1:
// progress.addEventListener('mousemove', () => {
//     if(mousedown){
//         scrub();
//     }
// });
// Mousemove option 2:
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', ()=> mousedown=true);
progress.addEventListener('mouseup', () => mousedown=false);