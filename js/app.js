document.body.style.backgroundImage = "url('card.png')";
document.body.style.backgroundSize= 'cover';
document.body.style.backgroundRepeat= 'no-repeat';
/*----------------- Constants -----------------*/

/*------------- Variables (state) -------------*/
let timer=0
let postion = 10
let currentTime = 180
let tiles = []
for (let i = 0; i < 8; i++) {
  tiles.push(Math.round(Math.random()))
}
players = []
for (let i = 0; i < 3; i++) {
   players.push([postion=0+i*10,true])
}

console.log(tiles)
/*--------- Cached Element References ---------*/

const squares = document.querySelectorAll('.board div')
const startBtn = document.querySelector('#button')
const timeLeft = document.querySelector('#time-left')
const statusEl = document.querySelector('#status')
const width = 10
const turnHtml = document.querySelector('#turn')
const moveUp = document.querySelector('#move_up')
const moveDown = document.querySelector('#move_down')
const hold = document.querySelector('#hold')
const push = document.querySelector('#push')
/*-------------- Event Listeners --------------*/
document.addEventListener('', render)
startBtn.addEventListener('click', start)
/*----------------- Functions -----------------*/

  function render(e) {
    squares[postion].classList.remove('player')
    switch(e.keyCode) {
      case 37:
        if(postion % width !== 0) postion -= 1
        break
      case 38:
        if(postion - width >= 0) postion -= width
        break
      case 39:
        if(postion % width < width - 1) postion += 1
        break
      case 40:
        if (postion + width < width * width) postion += width
        break
    }
    squares[postion].classList.add('player')
    check_lose()
  }


  function play() {
    currentTime--
    timeLeft.innerText = currentTime
    if (currentTime==0){
        clearInterval(timer);
        document.removeEventListener('keyup', render)
    }
  }


  function start() {
    if(timer) {
    }
    else {
      timer = setInterval(play, 1000)
      document.addEventListener('keyup', render)
    }
  }
  function check_lose(){
    if (postion>=1 && postion<=8){
        if (tiles[(postion%10)-1]==0){
            statusEl.innerText="you lose"
            clearInterval(timer);
            document.removeEventListener('keyup', render)
        }
    }
    else if(postion>=21 && postion<=28){
        if (tiles[(postion%10)-1]==1){
            statusEl.innerText="you lose"
            clearInterval(timer);
            document.removeEventListener('keyup', render)
        }
    }
  }
  

