// document.body.style.backgroundImage = "url('card.png')";
// document.body.style.backgroundSize= 'cover';
// document.body.style.backgroundRepeat= 'no-repeat';
/*----------------- Constants -----------------*/

/*------------- Variables (state) -------------*/
let timer
let postion = 10
let currentTime = 180

/*--------- Cached Element References ---------*/

const squares = document.querySelectorAll('.board div')
const startBtn = document.querySelector('#button')
const timeLeft = document.querySelector('#time-left')
const status = document.querySelector('#status')
const width = 10
/*-------------- Event Listeners --------------*/
document.addEventListener('', render)
startBtn.addEventListener('click', move)
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
  }


  function play() {
    currentTime--
    timeLeft.innerText = currentTime
  }


  function move() {
    if(timer) {
    } else {
      timer = setInterval(play, 1000)
      document.addEventListener('keyup', render)
    }
  }


