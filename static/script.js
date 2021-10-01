//challenge 1: age in days
function ageInDays(){
    let birthYear = prompt('In which year do you born... my friend?');
    let ageInDayss = (2021 - birthYear) * 365;
    
    var h1 = document.createElement(h1);
    
    var textAnswer = document.createTextNode(' You are'+ ' ' + ageInDayss + ' days old.');
    
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    
     document.getElementById('flex-box-result').appendChild(h1);
    
    }

function reset() {
    document.getElementById('ageInDays').remove();
}

//challenge 2 :generate cat
function GenerateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&timestamp=small";
    div.appendChild(image);
}

//challenge 3 : rock paper scissor
function rpsGame(yourChoice) {
console.log(yourChoice);

var humanChoice, botChoice;
humanChoice = yourChoice.id;

botChoice = numToChoice(randToRpsInt());
console.log('computerChoice:' ,botChoice);

results = winner(humanChoice, botChoice);
console.log(results);

message = finalMessage(results)
rpsFrontEnd(yourChoice.id, botChoice, message);

}

function randToRpsInt() {
    return Math.floor(Math.random() *3);
}
function numToChoice(numb){
    return['rock','paper','scissor'][numb];
}
function winner(yourChoice, computerChoice) {
  var rpsDatabase = {
        'rock':{'rock':0.5, 'paper':0, 'scissor':1},
        'paper':{'rock':1, 'paper':0.5, 'scissor':0},
        'scissor':{'rock':0, 'paper':1, 'scissor':0.5}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return[yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0) {
        return{'message': 'You lost!', 'color':'red'};
    } else if(yourScore === 1) {
        return{'message': 'You win!', 'color': 'green'};
    }else{
        return{'message': 'You tied!', 'color': 'yellow'};
    }

}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

var humanDiv = document.createElement('div');
var botDiv = document.createElement('div');
var messageDiv = document.createElement('div');

humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=130 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=130 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//challenge 4 : change the color of all buttons

 var all_buttons = document.getElementsByTagName('button');
 

var copyAllButtons = [];
for(let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
    console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonsRed();
    } else if(buttonThingy.value === 'green'){
        buttonGreen();
    } else if(buttonThingy.value === 'reset'){
        buttonColorReset();
    } else if(buttonThingy.value === 'random'){
        buttonsRandom();
    }
}
function buttonsRed(){
    for (let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success')
        
    }
}

function buttonColorReset(){
    for(let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
let choices = ['btn-primary','btn-danger','btn-success','btn-warning'];
for(let i=0; i < all_buttons.length; i++){

let randomNumber = Math.floor(Math.random()*4);
all_buttons[i].classList.remove(all_buttons[i].classList[1]);
all_buttons[i].classList.add(choices[randomNumber]);
}
}

//challenge 5 : blackjack
let blackjackGame = {
    'you' : {'scoreSpan' : '#your-blackjack-result','div' : '#your-box', 'score': 0}, 
    'dealer' : {'scoreSpan' : '#dealer-blackjack-result','div' : '#dealer-box', 'score': 0},
    'cards' : ['a', '7', 'k', 'two', 'q', 'J', '8', '10', '2', 'queen', '5', '3'],    
    'cardsMap' : {'a' : [1, 11], '7' : 7, 'k' : 10, 'two' : 2, 'q' : 10, 'J' : 10, '8': 8, '10' : 10, '2' : 2, 'queen' : 10, '5' : 5, '3' : 3},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sound.mp3');
const winSound = new Audio('static/cashreg.wav');
const lossSound = new Audio('static/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', standLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
    let card = randomCards();
    showCard(card, YOU); 
    updateScore(card, YOU);
    showScore(YOU); 
    }
}

function randomCards(){
    let randomIndex = Math.floor(Math.random() * 12);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
  if(activePlayer['score'] <= 21){  
    let cardImage = document.createElement('img');
    cardImage.src = `static/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal(){
   if(blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] =  false;
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
 
    for(let i=0; i < yourImages.length; i++){
     yourImages[i].remove();
    }  
    for(let i=0; i < dealerImages.length; i++){
    dealerImages[i].remove();   
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';

    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play"; 
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
  if(card === 'a'){
      if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
          activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    }else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }else {   
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}  

function showScore(activePlayer){
  if (activePlayer['score'] > 21){
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else{  
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  } 
}
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
async function standLogic() {
blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCards();
        showCard(card, DEALER); 
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(100);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}
//show who is winner
//update wins, draws, losses
function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        //you do not bust
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner = YOU;
        } else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
//when you bust but dealer does not
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;

//when you and dealer both bust        
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame); 
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true) {

if (winner === YOU) {
    document.querySelector('#wins').textContent = blackjackGame['wins'];
    message = 'You won!';
    messageColor = 'green';
    winSound.play();
}else if(winner === DEALER){
    document.querySelector('#losses').textContent = blackjackGame['losses'];
    message = 'You Lost!';
    messageColor = 'red';
    lossSound.play();
}else{
    document.querySelector('#draws').textContent = blackjackGame['draws'];
    message = 'You drew!';
    messageColor = 'yellow';
}

document.querySelector('#blackjack-result').textContent = message;
document.querySelector('#blackjack-result').style.color = messageColor;
    }
}



