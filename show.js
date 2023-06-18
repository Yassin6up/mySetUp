






let point = document.getElementById('dot')

window.onmousemove = (event)=>{
    point.style.transform = `translateX(${event.x }px) translateY(${event.y}px)`;
}

console.log(window.innerWidth);
if(window.innerWidth <= 600){
    console.log("mobile");
    point.style.display = "none";
}else{
    console.log('computer')
}

let musicBtn = document.getElementById('musicButton')
let isPlayed = false ;
musicBtn.onclick = ()=>{
    if(isPlayed){
        pauseMusic()
    }else{
        playMusic()
    }
}

function playMusic(){
    document.querySelectorAll('audio').forEach((music)=>{
        isPlayed = true
        return music.play()
        
    })
}
function pauseMusic(){
    document.querySelectorAll('audio').forEach((music)=>{
        isPlayed = false
        return music.pause()
        
    })
}