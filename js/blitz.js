const canvas = document.querySelector('#canvasBlitz');
const ctx = canvas.getContext('2d');
const message = document.querySelector('#messageBlitz');
const monRecord = 940;
const btnStart = document.querySelector('#startBlitz');
const record = document.querySelector('#recordBlitz');
record.innerHTML = monRecord;

let avion = {
    x: 330,
    y: 0
};
let immeubles = [];
let bombe = {};

// variables
// vitesse
let interval = 100;

// avancée de l'avion
let avancee = true;

//possibilité de tir
let charge = true;

//fin du jeu
let stopGame = false;

// Stockage du score
let score = 0;



// Début du jeu
btnStart.addEventListener('click', demarrerBlitz);
nettoieCanvas();

function demarrerBlitz() {
    dessinerAvion();
    creerImmeubles();
    annimation();
    btnStart.classList.add('disabled');
    canvas.addEventListener('click', placeBombe);
}
// Annimation
function annimation() {

    if (stopGame === true) {
        return;
    } else {

        setTimeout(function () {
            nettoieCanvas();
            dessinerEtages();

            if (avancee) {
                faireAvancerAvion();
                avancee = false;
            } else {
                avancee = true;
            }
            dessinerAvion();
            faireAvancerBombe();
            dessinerBombe();

            // destruction();

            // recursion
            annimation();

        }, interval);

    }

}

// rafraichissement du canvas
function nettoieCanvas() {

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.strokeRect(0, 0, canvas.clientWidth, canvas.height);
}

// Dessin de l'avion
function dessinerAvion() {
    ctx.fillStyle = "#446e9b";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(avion.x + 10, avion.y);
    ctx.lineTo(avion.x + 10, avion.y + 10);
    ctx.lineTo(avion.x, avion.y + 5);
    ctx.lineTo(avion.x + 10, avion.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

// déplacement de l'avion, changement de ligne avec délai d'attente, gestion de l'acceleration par ligne
function faireAvancerAvion() {
    finPerdu();
    finGagne();
    if (stopGame) {
        return
    }

    avion.x -= 10;

    if (avion.x == -30) {

        avion.x = 310;
        avion.y += 10;

        if (interval >= 70) {
            interval -= (5 + (avion.y / 10));
        } else if (interval > 30) {
            interval -= 5;
        }
        // console.log(interval);
    }
}

// Création des colonnes d'immeuble
function creerImmeubles() {
    for (let immeuble = 5; immeuble < 27; immeuble++) {
        let nbEtages = Math.floor((Math.random() * 30) + 1);
        creerEtages(nbEtages, immeuble * 10);
    }
}

// Création des blocs d'étage
function creerEtages(nbEtages, immeuble) {
    for (let j = 29; j >= (30 - nbEtages); j--) {
        let etage = {
            x: immeuble,
            y: (j * 10)
        }
        immeubles.push(etage);
    }
}

// affichage des blocs à partir de la liste immeubles
function dessinerEtages() {

    for (let etage of immeubles) {

        ctx.fillStyle = "#999999";
        ctx.strokeStyle = "black";
        ctx.fillRect(etage.x, etage.y, 10, 10);
        ctx.strokeRect(etage.x, etage.y, 10, 10);

    }
}

//emplacement de la bombe
function placeBombe() {
    if (charge) {
        bombe.x = avion.x;
        bombe.y = avion.y;
        charge = false;
        dessinerBombe();
    }
}

//affichage de la bombe

function dessinerBombe() {
    ctx.fillStyle = "#cd0200";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(bombe.x + 2, bombe.y);
    ctx.lineTo(bombe.x + 5, bombe.y + 10);
    ctx.lineTo(bombe.x + 8, bombe.y);
    ctx.lineTo(bombe.x + 2, bombe.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

// déplacement de la bombe
function faireAvancerBombe() {
    bombe.y += 10;
    destruction();
}

// destruction des tours

function destruction() {
    for (let etage of immeubles) {
        if (bombe.x == etage.x && bombe.y == etage.y) {
            let index = immeubles.indexOf(etage);
            immeubles.splice(index, 1);
            score += (300 - bombe.y) / 10;
        }
        if (bombe.y >= 300) {
            bombe = {};
            charge = true;
        }

        document.querySelector('#score').innerHTML = score;
    }
}

//fin du jeu perdu
function finPerdu() {
    for (let etage of immeubles) {
        if (avion.x == (etage.x + 10) && avion.y == etage.y) {
            stopGame = true;
            message.innerHTML = `Dommage!! Vous avez perdu avec un score de <span id="score2"></span>`;
            recommencer();
        }
    }
    return stopGame;
}

//fin du jeu gagné

function finGagne() {
    if (immeubles.length == 0) {
        stopGame = true;
        score += 500 - avion.y;
        document.querySelector('#score').innerHTML = score;
        message.innerHTML = `Bravo vous avez terminé le jeu avec un score de <span id="score2"></span>`
        recommencer();
        
    }
}

function recommencer() {
    document.querySelector('#score2').innerHTML = score;
    btnStart.innerHTML = "Recommencer";
    btnStart.classList.remove('disabled');
    btnStart.addEventListener('click', () => {
        document.location.reload(true);
    })

}