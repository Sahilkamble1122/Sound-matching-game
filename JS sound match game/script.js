const sounds = [
  'sound1.mp3.mp3', 
  'sound2.mp3.wav',
  'sound3.mp3.wav',
  'sound4.mp3.wav',
  'sound5.mp3.wav',
  'sound6.mp3.wav'
  ];
  const gameBoard = document.getElementById('game-board');
  const resetBtn = document.getElementById('reset-btn');
  let cards = [];
  let firstCard = null;
  let lockBoard = false;
  
  function shuffle(array) {
    return array.concat(array).sort(() => 0.5 - Math.random());
  }
  
  function createCards() {
    cards = shuffle(sounds);
    gameBoard.innerHTML = '';
    cards.forEach((sound, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.sound = sound;
      card.addEventListener('click', () => handleCardClick(card));
      gameBoard.appendChild(card);
    });
  }
  
  function handleCardClick(card) {
    if (lockBoard || card.classList.contains('matched') || card === firstCard) return;
  
    const sound = new Audio(`sounds/${card.dataset.sound}`);
    sound.play();
  
    if (!firstCard) {
      firstCard = card;
    } else {
      if (firstCard.dataset.sound === card.dataset.sound) {
    firstCard.classList.add("matched");
    card.classList.add("matched");

   
    firstCard.style.backgroundColor = "red";
    card.style.backgroundColor = "red";

    firstCard = null;
}
      lockBoard = true;
      setTimeout(() => {
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
  
  resetBtn.addEventListener('click', createCards);
  
  createCards(); // initial call
  