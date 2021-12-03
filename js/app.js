let timer=0
let turn=0
let postion = 10
let currentTime = 65
let tiles = []
for (let i = 0; i < 8; i++) {
  tiles.push(Math.round(Math.random()))
}
players = []
for (let i = 0; i < 3; i++) {
  players.push([postion=0+i*10,true,false])
}


/*--------- Cached Element References ---------*/

const squares = document.querySelectorAll('.board div')
const startBtn = document.querySelector('#button')
const timeLeft = document.querySelector('#time-left')
const statusEl = document.querySelector('#status')
const width = 10
const turnHtml = document.querySelector('#turn')
const moveUpBtn = document.querySelector('#moveUp')
const moveDownBtn = document.querySelector('#moveDown')
const holdBtn = document.querySelector('#hold')
const pushBtn = document.querySelector('#push')
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")

/*-------------- Event Listeners --------------*/

moveUpBtn.addEventListener('click', moveUp)
moveDownBtn.addEventListener('click', moveDown)
pushBtn.addEventListener('click',push)
holdBtn.addEventListener('click', hold)
startBtn.addEventListener('click', start)
lightDarkBtn.addEventListener("click", toggleLightDark)

/*----------------- Functions -----------------*/
function start() {
  if(timer) {
  } else {
      timer = setInterval(play, 1000)
      for (let i = 0; i < 3; i++) {
      squares[players[i][0]].classList.add('player'+(i+1).toString())
      turnHtml.innerText="player " + (turn+1).toString() + "'s turn to play"
      showButtons()
    }
  }
}

function play() {
  currentTime--
  timeLeft.innerText = currentTime
  if (currentTime==0){
      clearInterval(timer);
      statusEl.innerText="you lose"
      hideButtons() 
  }
}

function turns(){
  if (turn==0 && players[0][0]%10==0){
    turn=0
  } else if (turn==0 && players[1][1]==true){
    turn=1
  } else if (turn==0 && players[1][1]==false && players[2][1]==false){
    turn=0
  } else if (turn==0 && players[1][1]==false && players[2][1]==true){
    turn=2
  } else if (turn==1 && players[turn][0]%10==0 && players[0][1]==true && players[0][2]==false){
    turn=0
  } else if (turn==1 && players[turn][0]%10==0 && players[0][1]==true && players[0][2]==true){
    turn=1
  } else if (turn==1 && players[0][1]==false && players[2][1]==false){
    turn=1
  } else if (turn==1 && players[turn][0]%10==0 && players[0][1]==false){
    turn=1
  } else if (turn==1 && players[2][1]==true){
    turn=2
  } else if (turn==1 && players[2][1]==false && players[0][1]==true){
    turn=0
  } else if (turn==2 && players[0][1]==true && players[0][2]==false){
    turn=0
  } else if (turn==2 && players[0][1]==true && players[0][2]==true && players[1][1]==true && players[1][2]==false){
    turn=1
  } else if (turn==2 && players[0][1]==true && players[0][2]==true && players[1][1]==true && players[1][2]==true){
    turn=2
  } else if (turn==2 && players[0][1]==true && players[0][2]==true && players[1][1]==false){
    turn=2
  } else if (turn==2 && players[0][1]==false && players[1][1]==true && players[1][2]==false){
    turn=1
  } else if (turn==2 && players[0][1]==false && players[1][1]==true && players[1][2]==true){
    turn=2
  } else if (turn==2 && players[0][1]==false && players[1][1]==false){
    turn=2
  } else {
    turn=-1
  }
  turnHtml.innerText="player "+(turn+1).toString()+"'s turn to play";
}

function showButtons(){
  if (turn==0){
    moveUpBtn.style.visibility = 'visible'
    moveDownBtn.style.visibility = 'visible'
    holdBtn.style.visibility = 'visible'
  } else if (turn == 1 && players[0][1]==true){
    if (checkHold(turn)==true){
      holdBtn.style.visibility = 'visible'
      pushBtn.style.visibility = 'visible'
    } else {
      moveUpBtn.style.visibility = 'visible'
      moveDownBtn.style.visibility = 'visible'
      holdBtn.style.visibility = 'visible'
    }
  } else if (turn == 1 && players[0][1]==false){
    moveUpBtn.style.visibility = 'visible'
    moveDownBtn.style.visibility = 'visible'
    holdBtn.style.visibility = 'visible'
  } else if (turn == 2 && players[1][1]==true && players[0][1]==true){
    if (checkHold(turn) && checkHold(turn-1)){
      holdBtn.style.visibility = 'visible'
    } else if (checkHold(turn)){
      holdBtn.style.visibility = 'visible'
      pushBtn.style.visibility = 'visible'
    } else {
      moveUpBtn.style.visibility = 'visible'
      moveDownBtn.style.visibility = 'visible'
      holdBtn.style.visibility = 'visible'
    }
  } else if (turn == 2 && players[1][1]==true && players[0][1]==false){
    if (checkHold(turn)==true){
      holdBtn.style.visibility = 'visible'
      pushBtn.style.visibility = 'visible'
    } else {
      moveUpBtn.style.visibility = 'visible'
      moveDownBtn.style.visibility = 'visible'
      holdBtn.style.visibility = 'visible'
    }
  } else if (turn == 2 && players[1][1]==false){ 
    moveUpBtn.style.visibility = 'visible'
    moveDownBtn.style.visibility = 'visible'
    holdBtn.style.visibility = 'visible'
  }
}

function checkHold(turn){
  if (players[turn][0]%10 == ((players[turn-1][0]%10)-1)){
    return true;
  }
  else{
    return false;
  }
}

function hideButtons(){
  moveUpBtn.style.visibility = 'hidden'
  moveDownBtn.style.visibility = 'hidden'
  holdBtn.style.visibility = 'hidden'
  pushBtn.style.visibility = 'hidden'
}

function moveUp(){
  squares[players[turn][0]].classList.remove('player'+(turn+1).toString())
  if (players[turn][0]>=1 && players[turn][0]<=8){
    players[turn][0]=players[turn][0]+1;
  } else if(players[turn][0]>=21 && players[turn][0]<=28){
    players[turn][0]=players[turn][0] - 19;
  } else if(players[turn][0]%10 == 0) {
    players[turn][0]=1
  }
  squares[players[turn][0]].classList.add('player'+(turn+1).toString())
  hideButtons();
  loseBool=checkDie();
  winBool = checkPass();
  turns();
  if (!winBool && !loseBool){
    showButtons();
  }
}

function moveDown(){
  squares[players[turn][0]].classList.remove('player'+(turn+1).toString())
  if (players[turn][0]>=1 && players[turn][0]<=8){
    players[turn][0]=players[turn][0] + 21;
  } else if(players[turn][0]>=21 && players[turn][0]<=28){
    players[turn][0]=players[turn][0] + 1;
  } else if(players[turn][0]%10 == 0){
    players[turn][0] = 21
  }
  squares[players[turn][0]].classList.add('player'+(turn+1).toString())
  hideButtons()
  loseBool= checkDie()
  winBool = checkPass()
  turns()
  if (!winBool && !loseBool){
    showButtons()
  }
}

function hold(){
  hideButtons();
  turns();
  showButtons();
}

function push(){
  if (turn==1){
    squares[players[1][0]].classList.remove('player'+(2).toString())
    squares[players[0][0]].classList.remove('player'+(1).toString())
    players[1][0]=players[0][0]
    players[0][0]=players[0][0]+1
    squares[players[1][0]].classList.add('player'+(2).toString())
    squares[players[0][0]].classList.add('player'+(1).toString())
    turn=turn-1
    hideButtons();
    loseBool=checkDie();
    winBool= checkPass();
    turn=turn+1;
    turns();
    if (!winBool && !loseBool){
    showButtons();
    } 
  }else {
      squares[players[2][0]].classList.remove('player'+(3).toString())
      squares[players[1][0]].classList.remove('player'+(2).toString())
      players[2][0]=players[1][0]
      players[1][0]=players[1][0]+1
      squares[players[2][0]].classList.add('player'+(3).toString())
      squares[players[1][0]].classList.add('player'+(2).toString())
      turn=turn-1
      hideButtons();
      loseBool=checkDie();
      winBool = checkPass();
      turn=turn+1;
      turns();
      if (!winBool && !loseBool){
        showButtons();
      }
  }
}

function checkDie(){
  loseBool = false
  if (players[turn][0]>=1 && players[turn][0]<=8){
    if (tiles[(players[turn][0]%10)-1]==0){
      statusEl.innerText="player "+(turn+1).toString()+" lost"
      players[turn][1]=false
      squares[players[turn][0]].classList.remove('player'+(turn+1).toString())
      squares[players[turn][0]].classList.add('player'+(turn+1).toString() +"dead")
      loseBool=checkLose()
    }
  }
  else if(players[turn][0]>=21 && players[turn][0]<=28){
    if (tiles[(players[turn][0]%10)-1]==1){
      statusEl.innerText="player "+(turn+1).toString()+" lost"
      players[turn][1]=false
      squares[players[turn][0]].classList.remove('player'+(turn+1).toString())
      squares[players[turn][0]].classList.add('player'+(turn+1).toString() +"dead")
      loseBool=checkLose()
    }
  }
  return loseBool
}

function checkLose(){
  for(let i = 0; i < 3; i++) {
    if (players[i][1]==true){
      return false
    }
  }
  statusEl.innerText="you lose"
  clearInterval(timer);
  hideButtons()
  return true
}

function checkPass(){
  winBool=false
  if (players[turn][0]%10==9){
    squares[players[turn][0]].classList.remove('player'+(turn+1).toString());
    statusEl.innerText="player "+(turn+1).toString()+" win";
    players[turn][2]=true;
    winBool = checkWin();
  }
  return winBool
}

function checkWin(){
  winBool = false
  for(let i = 0; i < 3; i++) {
    if (players[i][2]==true){
      winBool = true
    }
  } 
  if (winBool){
    statusEl.innerText="you win"
    clearInterval(timer);
    hideButtons()
  }
  return winBool
}

function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}
checkDarkPref()