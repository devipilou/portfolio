const canvas = document.querySelector('#canvasBlitz');
const ctx = canvas.getContext('2d');
const message = document.querySelector('#messageBlitz');
const monRecord = 3958;
const btnStart = document.querySelector('#startBlitz');
const record = document.querySelector('#recordBlitz');
record.innerHTML = monRecord;

let avion = {
    x: 330,
    y: 0
};
let immeubles = [];
let bombe = {};
let coef;

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


initialisation();
// Début du jeu
btnStart.addEventListener('click', demarrerBlitz);

function initialisation() {
    nettoieCanvas();
    avion = {
        x: 330,
        y: 10
    };
    stopGame = false;
    score = 0;
    charge = true;
    interval = 100;
    immeubles = [];
    avancee = true;

}

function demarrerBlitz() {
    dessinerAvion();
    while (immeubles.length < 100) {
        immeubles = [];
        creerImmeubles();
    }
    coef = (264 - immeubles.length) / 100;
    console.log(immeubles.length, coef);
    annimation();
    btnStart.classList.add('disabled');
    canvas.addEventListener('click', placeBombe);
}
// Annimation
function annimation() {

    if (stopGame === true) {
        return;
    } else {

        const timeOut = setTimeout(function () {
            nettoieCanvas();

            if (avancee) {
                faireAvancerAvion();
                avancee = false;
            } else {
                avancee = true;
            }
            dessinerLumieres();
            dessinerAvion();
            dessinerEtages();
            faireAvancerBombe();
            dessinerBombe();

            // recursion
            annimation();

        }, interval);

    }

}

// rafraichissement du canvas
function nettoieCanvas() {

    ctx.fillStyle = "#343a40";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height - 20);
    ctx.fillStyle = "#495057";
    ctx.fillRect(0, canvas.height - 20, canvas.clientWidth, 20);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.clientWidth, canvas.height);
}

// Dessin de l'avion
function dessinerAvion() {
    ctx.fillStyle = "#adb5bd";
    ctx.strokeStyle = "#212529";
    ctx.beginPath();
    ctx.moveTo(avion.x + 12, avion.y);
    ctx.lineTo(avion.x + 10, avion.y + 2);
    ctx.lineTo(avion.x + 8, avion.y + 4);
    ctx.lineTo(avion.x + 2, avion.y + 5);
    ctx.lineTo(avion.x - 2, avion.y + 6);
    ctx.lineTo(avion.x + 2, avion.y + 7);
    ctx.lineTo(avion.x + 10, avion.y + 8);
    // ctx.lineTo(avion.x + 12, avion.y);

    // ctx.lineTo(avion.x + 10, avion.y + 10);
    // ctx.lineTo(avion.x, avion.y + 5);
    // ctx.lineTo(avion.x + 10, avion.y);
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
        let nbEtages = Math.floor((Math.random() * 12) + 1);
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


        if (!(bombe.x == etage.x && bombe.y == etage.y - 10)) {

            // dessin normal
            ctx.fillStyle = "#495057";
            ctx.strokeStyle = "#212529";
            ctx.fillRect(etage.x, etage.y, 10, 10);
            ctx.strokeRect(etage.x, etage.y, 10, 10);

            ctx.fillStyle = '#adb5bd';
            ctx.fillRect(etage.x + 2, etage.y + 2, 6, 1);
            ctx.fillRect(etage.x + 2, etage.y + 4, 6, 1);
            ctx.fillRect(etage.x + 2, etage.y + 6, 6, 1);
            ctx.fillRect(etage.x + 2, etage.y + 8, 6, 1);

        } else {

            // dessin des explosions
            ctx.fillStyle = "#d8f3dc";
            ctx.strokeStyle = "#081c15";
            ctx.beginPath()
            ctx.moveTo(etage.x - 3, etage.y - 5);
            ctx.lineTo(etage.x + 5, etage.y + 8);
            ctx.lineTo(etage.x + 13, etage.y - 5);
            ctx.lineTo(etage.x + 11, etage.y + 10);
            ctx.lineTo(etage.x - 1, etage.y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

        }

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
    ctx.fillStyle = "#adb5bd";
    ctx.strokeStyle = "#212529";
    ctx.beginPath();
    ctx.moveTo(bombe.x + 3, bombe.y);
    ctx.moveTo(bombe.x + 3, bombe.y + 7);
    ctx.lineTo(bombe.x + 5, bombe.y + 10);
    ctx.lineTo(bombe.x + 7, bombe.y + 7);
    ctx.lineTo(bombe.x + 7, bombe.y);
    ctx.lineTo(bombe.x + 3, bombe.y);
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
            score += (300 - avion.y) / 10;
        }
        if (bombe.y >= 300) {
            bombe = {};
            charge = true;
        }

        document.querySelector('#score').innerHTML = score;
    }
}

// Annimation des lumières
function dessinerLumieres() {

    ctx.fillStyle = "#212529";
    ctx.fillRect(20, 290, 10, 10);
    ctx.fillRect(290, 290, 10, 10);
    if (avion.y < 290) {
        ctx.fillStyle = "#6c757d";
        ctx.beginPath();
        ctx.moveTo(25, 290);
        ctx.lineTo(avion.x - 10, avion.y);
        ctx.arc(avion.x + 5, avion.y, 15, 0, 1.9 * Math.PI);
        ctx.lineTo(avion.x + 20, avion.y);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(295, 290);
        ctx.lineTo(avion.x - 10, avion.y);
        ctx.lineTo(avion.x + 20, avion.y);
        ctx.closePath();
        ctx.fill();

    }
};

//fin du jeu perdu
function finPerdu() {
    for (let etage of immeubles) {
        if (avion.x == (etage.x + 10) && avion.y == etage.y) {
            stopGame = true;
            bombe = {};
            score += 500 - avion.y;
            score = Math.floor(score * coef);
            if (score > monRecord) {
                message.innerHTML = `Dommage !! Vous avez perdu avec un score de <span id="score2"></span><br>C'est dommage vous aviez battu mon record`;
            } else {
                message.innerHTML = `Dommage !! Vous avez perdu avec un score de <span id="score2"></span><br>Entrainez-vous encore pour battre mon record`;
            }
            recommencer();
        }
    }
    return stopGame;
}

//fin du jeu gagné

function finGagne() {
    if (immeubles.length == 0) {
        stopGame = true;
        bombe = {};
        score += 500 - avion.y;
        score = Math.floor(score * coef);
        document.querySelector('#score').innerHTML = score;
        if (score > monRecord) {
            message.innerHTML = `Bravo !! Vous avez terminé le jeu avec un score de <span id="score2"></span><br>Et vous avez également battu mon record`
        } else {
            message.innerHTML = `Bravo !! Vous avez terminé le jeu avec un score de <span id="score2"></span><br>Mais entrainez-vous encore pour battre mon record`
        }
        recommencer();

    }
}

function recommencer() {
    document.querySelector('#score2').innerHTML = score;
    btnStart.innerHTML = "Recommencer";
    btnStart.classList.remove('disabled');
    btnStart.addEventListener('click', () => {
        document.location.reload(true);
        // nettoieCanvas();
        // initialisation();
        // demarrerBlitz();
    })

}