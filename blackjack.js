const image = document.getElementById("cardContainer");
document.getElementById("dealerFace").src = "/dealerfaces/default.gif"
var lossAudioPlayer = new Audio("audio/Ты никогда не победи (1).m4a");
var tieAudioPlayer = new Audio("audio/В следующий раз тебе.m4a");
var winAudioPlayer = new Audio("audio/Я достану тебя в сле.m4a");
var cardSwooshAudioPlayer = new Audio("audio/cardswoosh_azZRYEA5.mp3");
var liverAudioPlayer = new Audio("audio/Нет денег Дай мне св.m4a");

const deck = [
    { card: '2-C.png', points: 2 },
    { card: '2-D.png', points: 2 },
    { card: '2-H.png', points: 2 },
    { card: '2-S.png', points: 2 },
    { card: '3-C.png', points: 3 },
    { card: '3-D.png', points: 3 },
    { card: '3-H.png', points: 3 },
    { card: '3-S.png', points: 3 },
    { card: '4-C.png', points: 4 },
    { card: '4-D.png', points: 4 },
    { card: '4-H.png', points: 4 },
    { card: '4-S.png', points: 4 },
    { card: '5-C.png', points: 5 },
    { card: '5-D.png', points: 5 },
    { card: '5-H.png', points: 5 },
    { card: '5-S.png', points: 5 },
    { card: '6-C.png', points: 6 },
    { card: '6-D.png', points: 6 },
    { card: '6-H.png', points: 6 },
    { card: '6-S.png', points: 6 },
    { card: '7-C.png', points: 7 },
    { card: '7-D.png', points: 7 },
    { card: '7-H.png', points: 7 },
    { card: '7-S.png', points: 7 },
    { card: '8-C.png', points: 8 },
    { card: '8-D.png', points: 8 },
    { card: '8-H.png', points: 8 },
    { card: '8-S.png', points: 8 },
    { card: '9-C.png', points: 9 },
    { card: '9-D.png', points: 9 },
    { card: '9-H.png', points: 9 },
    { card: '9-S.png', points: 9 },
    { card: '10-C.png', points: 10 },
    { card: '10-D.png', points: 10 },
    { card: '10-H.png', points: 10 },
    { card: '10-S.png', points: 10 },
    { card: 'A-C.png', points: 1 }, // or 11 depending on the game rules
    { card: 'A-D.png', points: 1 },
    { card: 'A-H.png', points: 1 },
    { card: 'A-S.png', points: 1 },
    { card: 'J-C.png', points: 10 },
    { card: 'J-D.png', points: 10 },
    { card: 'J-H.png', points: 10 },
    { card: 'J-S.png', points: 10 },
    { card: 'Q-C.png', points: 10 },
    { card: 'Q-D.png', points: 10 },
    { card: 'Q-H.png', points: 10 },
    { card: 'Q-S.png', points: 10 },
    { card: 'K-C.png', points: 10 },
    { card: 'K-D.png', points: 10 },
    { card: 'K-H.png', points: 10 },
    { card: 'K-S.png', points: 10 },
  ];

  const drawnCards = [];

  document.getElementById("cardContainer").hidden = true;
  document.getElementById("dealerCards").hidden = true;
  document.getElementById("scoreCounter").hidden = true;
  document.getElementById("dealerScore").hidden = true;
  document.getElementById("hitButton").hidden = true;
  document.getElementById("standButton").hidden = true;
  document.getElementById("refreshButton").hidden = true;


  let score = 0; 
  let numAces = 0;
  let dealerScore = 0;
  if (!sessionStorage.getItem('budget')) {
    sessionStorage.setItem('budget', JSON.stringify(1000));
  }
  var budget = JSON.parse(sessionStorage.getItem('budget'));
  let currentBet = 0;
  if(budget == 0){
    liver();
  }
  updateBudget(budget);
  // sessionStorage.setItem('hasLiver', true);
  // var hasLiver = sessionStorage.setItem('hasLiver', true);
  

function updateBudget(newBudget){
  document.getElementById("budgetText").textContent = "Budget: " + budget;
}

function updateBet(newBet){
  document.getElementById("betText").textContent = "Bet: " + currentBet;
}

function clearBet(){
  budget += currentBet;
  currentBet = 0;
  updateBudget(budget);
  updateBet(currentBet);
}

function placeBet(bet){
    if(budget >= bet){
        currentBet += bet;
        budget -= bet;
    }
    updateBet(currentBet)
    updateBudget(budget);
        sessionStorage.setItem('budget', JSON.stringify(budget));
}

function startGame(){
    if(currentBet > 0){
        document.getElementById("betButtons").hidden = true;
        document.getElementById("budgetText").hidden = true;
        document.getElementById("betText").hidden = true;
        document.getElementById("cardContainer").hidden = false;
        document.getElementById("dealerCards").hidden = false;
        document.getElementById("scoreCounter").hidden = false;
        document.getElementById("dealerScore").hidden = false;
        document.getElementById("standButton").hidden = false;
        document.getElementById("hitButton").hidden = false;
        document.getElementById("placeBetButton").hidden = true;
        document.getElementById("clearBetButton").hidden = true;

        for (let i = 0; i < 2; i++) {
          pickRandomCard();
        }
        pickRandomCardForDealer();
    }else{
        return
    }
}

function updateScore(points) {
    score += points; // Update the score by adding the points of the drawn card
    document.getElementById("scoreCounter").textContent = `Score: ${score}`; // Update the score counter element
    if(score >= 21){
        determineWinner();
    }
}

function handleAce() {
    if (score + 11 > 21) {
      updateScore(1); // If changing the Ace to 11 would cause a bust, use the value of 1
    } else {
      updateScore(11); // Otherwise, use the value of 11 for the Ace
    }
  }

function handleDealerAce(){
    if (score + 11 > 21) {
        updateDealerScore(1); // If changing the Ace to 11 would cause a bust, use the value of 1
      } else {
        updateDealerScore(11); // Otherwise, use the value of 11 for the Ace
      }
}

function pickRandomCard() {
    cardSwooshAudioPlayer.play();
    if (score >= 21) {
        handleDealerTurn();
        return;
      }

    if (deck.length === 0) {
        return;
    }
    var currentCardIndex = Math.floor(Math.random() * deck.length);
    var currentCard = deck[currentCardIndex];
  
    // Create an image element for the card
    var cardImage = document.createElement("img");
    cardImage.src = "cards/" + currentCard.card;
    cardImage.classList.toggle("slide-in");

    if (currentCard.card.startsWith("A-")) {
        numAces++; // Track the number of Ace cards drawn
    
        if (numAces === 1) {
          handleAce(); // If it's the first Ace card, handle it immediately
        } else {
          updateScore(currentCard.points); // Otherwise, add the default points for the Ace card
        }
      } else {
        updateScore(currentCard.points); // Add the points of the non-Ace card
      }
  
    // Append the card image to the card container
    cardContainer.appendChild(cardImage);
  
    // Add the selected card to the drawnCards array
    drawnCards.push(currentCard);
  
    // Remove the selected card from the deck
    deck.splice(currentCardIndex, 1);
}

function updateDealerScore(points) {
    dealerScore += points;
    document.getElementById("dealerScore").textContent = `Dealer: ${dealerScore}`;
  }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function handleDealerTurn() {
    var refreshButton = document.getElementById("hitButton").style.display = "none";
    var refreshButton = document.getElementById("standButton").style.display = "none";
    while (dealerScore < 17) {
      await sleep(700); // Wait for 0.7 second
      pickRandomCardForDealer();
      cardSwooshAudioPlayer.play();
    }
    determineWinner();
  }

function pickRandomCardForDealer() {
    if (deck.length === 0) {
      return;
    }
  
    const currentCardIndex = Math.floor(Math.random() * deck.length);
    const currentCard = deck[currentCardIndex];
  
    if (currentCard.card.startsWith("A-")) {
        numAces++; // Track the number of Ace cards drawn
    
        if (numAces === 1) {
          handleDealerAce(); // If it's the first Ace card, handle it immediately
        } else {
          updateDealerScore(currentCard.points); // Otherwise, add the default points for the Ace card
        }
      } else {
        updateDealerScore(currentCard.points); // Add the points of the non-Ace card
      }

    deck.splice(currentCardIndex, 1); // Remove the drawn card from the deck

    // Create an image element for the dealer's card
  const dealerCardImage = document.createElement("img");
  dealerCardImage.src = "cards/" + currentCard.card;
  dealerCardImage.classList.add("dealer-card");
  dealerCardImage.classList.toggle("slide-in");

  // Append the dealer's card to the dealer's card container
  document.getElementById("dealerCards").appendChild(dealerCardImage);
  }

function stand() {
    handleDealerTurn();
  }
  
function determineWinner(){
    var winner;
    
    if (score > 21 && dealerScore > 21) {
        winner = "tie";
      } else if (score > 21) {
        winner = "dealer"
      } else if (dealerScore > 21) {
        winner = "player";
      } else if (score === dealerScore) {
        winner = "tie";
      } else if (score > dealerScore) {
        winner = "player";
      } else {
        winner = "dealer";
      }

    if(winner == "player"){
        document.getElementById("dealerText").hidden = false;
        document.getElementById("dealerText").src="dealertexts/textbubblewin.png";
        budget += (currentBet * 2);
        sessionStorage.setItem('budget', JSON.stringify(budget));
        document.getElementById("winnerText").textContent = `You won!`;
        document.getElementById("dealerFace").src = "/dealerfaces/loss.gif"
        winAudioPlayer.play();

    }else if(winner == "dealer"){
        document.getElementById("dealerText").hidden = false;
        document.getElementById("dealerText").src="dealertexts/textbubbleloss.png";
        document.getElementById("winnerText").textContent = `You lost...`;
        document.getElementById("dealerFace").src = "/dealerfaces/dub.gif"
        lossAudioPlayer.play();
        sessionStorage.setItem('budget', JSON.stringify(budget));

    }else if(winner == "tie"){
        document.getElementById("winnerText").textContent = `TIE`;
        document.getElementById("dealerFace").src = "/dealerfaces/tie.gif"
        budget += currentBet;
        tieAudioPlayer.play();
        sessionStorage.setItem('budget', JSON.stringify(budget));

    }
    var refreshButton = document.getElementById("refreshButton");
    refreshButton.style.display = 'flex';
    var refreshButton = document.getElementById("hitButton").style.display = "none";
    var refreshButton = document.getElementById("standButton").style.display = "none";
  }

function playAgain(){
    location.reload();
  }

async function liver(){
  // if(hasLiver){
    liverAudioPlayer.play();
    document.getElementById("dealerText").hidden = false;
    document.getElementById("dealerText").src="dealertexts/textbubbleliver.png";
    document.getElementById("dealerHand").hidden = false;
    document.getElementById("dealerHand").classList.toggle("take-liver");
    await sleep(3000);
    document.getElementById("giveLiver").hidden = false;
    console.log(hasLiver);
  // }else{
  //   return;
  // }
}

async function giveLiver(){
  sessionStorage.setItem('hasLiver', false);
  document.getElementById("dealerHand").src="dealerfaces/dealerFist.png";
  document.getElementById("dealerHand").classList.toggle("reverse-hand");
  document.getElementById("giveLiver").hidden = true;
  await sleep(3000);
  document.getElementById("dealerHand").hidden = true;
  budget = 10000;
  sessionStorage.setItem('budget', JSON.stringify(budget));
  updateBudget(budget);
  document.getElementById("dealerText").hidden = true;
}
