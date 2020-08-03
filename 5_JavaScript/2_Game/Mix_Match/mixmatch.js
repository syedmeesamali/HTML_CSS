class AudioController {
        constructor() {
                this.bigMusic = new Audio('Assets/Audio/creepy.mp3');
                this.flipAudio = new Audio('Assets/Audio/flip.wav');
                this.matchSound = new Audio('Assets/Audio/match.wav');
                this.victorySound = new Audio('Assets/Audio/victory.wav');
                this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
                this.bigMusic.volume = 0.5;
                this.bigMusic.loop = true;
        }
        startMusic() {   this.bigMusic.play();   }
        stopMusic() {
                this.bigMusic.pause();
                this.bigMusic.currentTime = 0;
        }
        flip() {   this.flipAudio.play();      }
        match () { this.matchSound.play();     }
        victory() {       this.stopMusic();
                          this.victorySound.play();   }
        gameOver() {      this.stopMusic();
                          this.gameOverSound.play();  }
}

//Just the audio player playing only
function audioPlayer() {
        console.log("Button clicked");
        let audioController = new AudioController();
        audioController.startMusic();
}

class MixOrMatch {
        constructor(totalTime, Cards) {
                this.cardsArray = Cards;
                this.totalTime = totalTime;
                this.timeRemaining = totalTime;
                this.timer = document.getElementById('time-remaining');
                this.ticker = document.getElementById('flips');
                this.audioController = new AudioController();
        }
        startGame() {
                this.cardToCheck = null;
                this.totalClicks = 0;
                this.timeRemaining = this.totalTime;
                this.matchedCards = [];
                this.busy = true;
                setTimeout(() =>  {
                        this.audioController.startMusic();
                        this.shuffleCards();
                        this.countdown = this.startCountDown();
                        this.busy = false;
                }, 500);
                this.hideCards();
                this.timer.innerText = this.timeRemaining;
                this.ticker.innerText = this.totalClicks;

        }
        hideCards(){
                this.cardsArray.forEach(card => {
                        card.classList.remove('visible');
                        card.classList.remove('matched');
                })
        }
        flipCard(card) {
                if(this.canFlipCard(card)) {
                        this.audioController.flip();
                        this.totalClicks++;
                        this.ticker.innerText = this.totalClicks;
                        card.classList.add('visible');
                        //Main if statement and checks
                }
        }
        gameOver() {
                clearInterval(this.countdown);
                this.audioController.gameOver();
                document.getElementById('game-over-text').classList.add('visible');
        }
        startCountDown(){
                return setInterval(() => {
                        this.timeRemaining--;
                        this.timer.innerText  =  this.timeRemaining;
                        if(this.timeRemaining === 0) {
                                this.gameOver();
                        }
                }, 1000);
        }
        shuffleCards() {
                for (let i = this.cardsArray.length - 1; i > 0; i--) {
                        let randIndex = Math.floor(Math.random() * (i + 1));
                        this.cardsArray[i].style.order = i;
                        this.cardsArray[i].style.order = randIndex;
                }
        }
        canFlipCard(card) {
                return true;
        }
}


window.onload = doStuff;
function doStuff() {
        console.log("Window content loaded");
        let overlays = Array.from(document.getElementsByClassName('overlay-text'));
        let cards = Array.from(document.getElementsByClassName('card'));
        let game = new MixOrMatch(50, cards);
        overlays.forEach(overlay => {
                overlay.addEventListener('click', () => {
                        overlay.classList.remove('visible');
                        game.startGame();
                })
        })

        cards.forEach(card => {
                card.addEventListener('click', () => {
                        let audioController = new AudioController();
                        audioController.flip();
                        game.flipCard();
                })
        })
        const myBtn = document.querySelector("button");
        let musicOff = true;
        myBtn.addEventListener('click', () => {
                if(musicOff === true) {
                        let audioController = new AudioController();
                        audioController.startMusic();   
                        musicOff = false;
                } else {
                        let audioController = new AudioController();
                        audioController.stopMusic();
                        musicOff = true;
                }
        });
}