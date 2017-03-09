/*global math*/
var mainWrapper;

const BUTTON_CLASS_NAME = "control-button";
const PLAYER_SCORE_CLASS_NAME = "player-score";
const PLAYER_NAME_CLASS_NAME = "player-title";
const PLAYER_CLASS_NAME = "player-wrapper";
const SPADES = 0;
const HEARTS = 1;
const DIAMONDS = 2;
const CLUBS = 3;
const JACK = 11;
const QUEEN = 12;
const KING = 13;
const ACE = 14;

var createButton = (text, funCall, id) => {
    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode(text));
    button.className = BUTTON_CLASS_NAME;
    button.id = id;
    return button;
};

var player = function(name, color) {
    /* name is a string that is displayed as the title of the player's section
    color is a string containing a valid css color*/
    this.name = name;
    this.color = color;
    this.score = math.complex({re:0, im:0});
    this.cardsForRound = [];
    this.view = false;
    this.scoreChild = false;
    this.clearCards = function() {
        this.cardsForRound = [];
    };
    this.getAbsoluteScore = function() {
        return this.score.toPolar().r;
    };
    this.earnPoints = function(score) {
        score = math.complex(score);
        this.score = math.complex({
            re: this.score.re + score.re,
            im: this.score.im + score.im
        });
        this.updateScore();
    };
    this.scoreString = function() {
        return this.score.re + " + " + this.score.im + "i (" + this.getAbsoluteScore() + ")"; 
    };
    this.createView = function(wrapper) {
        var div = document.createElement("DIV");
        div.classList.add(PLAYER_CLASS_NAME);
        var titleChild = document.createElement("H3");
        titleChild.appendChild(document.createTextNode(this.name));
        titleChild.classList.add(PLAYER_NAME_CLASS_NAME);
        div.appendChild(titleChild);
        var scoreChild = document.createElement("P");
        scoreChild.appendChild(document.createTextNode(this.scoreString()));
        scoreChild.classList.add(PLAYER_SCORE_CLASS_NAME);
        this.scoreChild = scoreChild;
        div.appendChild(scoreChild);
        wrapper.appendChild(div);
        this.view = div;
    };
    this.updateScore = function() {
        if (this.scoreChild) {
            this.scoreChild.textContent = this.scoreString();
            return true;
        } else {
            return false;
        }
    };
};

var card = function(strName, suit, number, className, score = 0) {
    this.strName = strName;
    this.suit = suit;
    this.number = number;
    if (this.suit == CLUBS & this.number == JACK) {
        this.isJackOfClubs = true;
    }
    this.score = math.complex(score);
    this.elements = document.getElementsByClassName(className);
};

var onload = () => {
    mainWrapper = document.getElementById("main-wrapper");
    console.log("onload was called");
}