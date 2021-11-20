
const canvas = document.querySelector('#canvasSnake');
const ctx = canvas.getContext('2d');
const message = document.querySelector('#messageSnake');
const monRecord = 500;

const record = document.querySelector('#record');
record.innerHTML = monRecord;



// Variables
// Vitesse sur X
vx = 10;
// Vitesse sur Y
vy = 0;
// pommeX
let pommeX = 0;
// pommeY
let pommeY = 0;
// Score
let score = 0;
// bug direction
let bugDirection = false;
// stopgame
let stopGame = false;
// Intervalle pour la dificulté croissante
let interval = 200;

let snake = [ {x:40, y:150}, {x:30, y:150}, {x:20, y:150}, {x:10, y:150} ];


function annimation(){

    if(stopGame === true){
        return;
    }else{
        
        setTimeout(function(){
            bugDirection = false;
            nettoieCanvas();
            dessinePomme()
    
            faireAvancerSerpent();
    
            dessineLeSerpent();
    
            // recursion
            annimation();
    
        }, interval);


    }

}
annimation();
creerPomme();
dessineLeSerpent();

function nettoieCanvas(){

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height);
    ctx.strokeRect(0,0,canvas.clientWidth, canvas.height);
}
function dessineLesMorceaux(morceau){

    ctx.fillStyle = "#446e9b";
    ctx.strokeStyle = "black";
    ctx.fillRect(morceau.x, morceau.y, 10, 10);
    ctx.strokeRect(morceau.x, morceau.y, 10, 10);
}

function dessineLeSerpent(){
    snake.forEach(morceau => {
        dessineLesMorceaux(morceau);
    })
}

function faireAvancerSerpent() {

    const head = {x: snake[0].x + vx, y: snake[0].y + vy};
    snake.unshift(head);
    if(finDuJeu()){
        snake.shift(head);
        recommencer();
        stopGame = true;
        return;
    }
    
    const serpentMangePomme = snake[0].x === pommeX && snake[0].y === pommeY;

    if(serpentMangePomme){
        score += 10;
        document.querySelector('#score').innerHTML = score;
        // acceleration
        if (score%50 === 0){
            if(interval > 100){
                interval -= 20;
            }else if(interval <= 100 && interval > 80){
                interval -= 5;
            }else if(interval <= 80 && interval > 60){
                interval -= 2;
            }else if(interval <= 60 && interval > 50){
                interval -= 1;
            }
            console.log("intervalle de rafraichissement :" + interval);
        }
        creerPomme();
    }else{
        snake.pop();
    }
}



document.addEventListener('keydown', changerDirection);

function changerDirection(event){
    event.preventDefault();
    
    // eviter le bug direction
    if (bugDirection) return;
    bugDirection = true;
    
    const flecheGauche = 37;
    const flecheDroite = 39;
    const flecheHaut = 38;
    const flecheBas = 40;
    
    const direction = event.keyCode;
    
    const monter = vy === -10;
    const descendre = vy === 10;
    const adroite = vx === 10;
    const agauche = vx === -10;
    
    if(direction === flecheGauche && !adroite){
        vx = -10;
        vy = 0;
    }
    if(direction === flecheHaut && !descendre){
        vx = 0;
        vy = -10;
    }
    if(direction === flecheDroite && !agauche){
        vx = 10;
        vy = 0;
    }
    if(direction === flecheBas && !monter){
        vx = 0;
        vy = 10;
    }
}

// Detection des swipes et de leur direction
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    let toucheOn = e.changedTouches[0];
    let startX = toucheOn.pageX; //emplacement de départ
    let startY = toucheOn.pageY; //emplacement de départ
    let swipeDirection = "none";
    let dist = 0;
    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;
    let startTime = new Date().getTime() //enregistrement de l'instant ou le doigt touche l'écran
    let distX, distY, elapsedTime;


    // annulation du scroll quand on swipe dans le jeu
    canvas.addEventListener('touchemove', (evt) => {
        evt.preventDefault();
    });


    // détecter la fin et comprendre le sens du mouvement
    canvas.addEventListener('touchend', (event) => {
        event.preventDefault();
        let toucheOff = event.changedTouches[0];
        distX = toucheOff.pageX - startX; //distance horizontale
        distY = toucheOff.pageY - startY; //distance verticale
        elapsedTime = new Date().getTime - startTime;
        if(Math.abs(distX) > Math.abs(distY)){ //déplacement horizontal
            swipeDirection = (distX < 0) ? 'gauche' : 'droite';
        }else{ //deplacement vertical
            swipeDirection = (distY < 0) ? 'haut' : 'bas';
        }
        // if(elapsedTime <= allowedTime){
        // }else{
        //     console.log("trop lent")
        // }
    
        changerDirectionMobile(swipeDirection);
    });
    
});

function changerDirectionMobile(swipeDirection){
    console.log(swipeDirection);

    // eviter le bug direction
    if (bugDirection) return;
    bugDirection = true;


    const monter = vy === -10;
    const descendre = vy === 10;
    const adroite = vx === 10;
    const agauche = vx === -10;

    if(swipeDirection === 'gauche' && !adroite){
        vx = -10;
        vy = 0;
    }
    if(swipeDirection === 'haut' && !descendre){
        vx = 0;
        vy = -10;
    }
    if(swipeDirection === 'droite' && !agauche){
        vx = 10;
        vy = 0;
    }
    if(swipeDirection === 'bas' && !monter){
        vx = 0;
        vy = 10;
    }
}

function random(){

    return Math.round(Math.random()*29) * 10 ;

}

function creerPomme(){
    pommeX = random();
    pommeY = random();
    // console.log(pommeX, pommeY);

    snake.forEach(function(part){
        const serpentSurPomme = part.x == pommeX && part.y == pommeY;

        if(serpentSurPomme){
            creerPomme();
        }
    })
}

function dessinePomme(){

    ctx.fillStyle = "#cd0200";
    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.arc(pommeX + 5, pommeY + 5, 5, 0, 2 * Math.PI);
    ctx.arc(pommeX + 3, pommeY - 5, 5, 0, Math.PI/3);
    ctx.fill();
    ctx.stroke();
}

function finDuJeu(){

    let snakeSansTete = snake.slice(1,-1);
    let mordu = false;
    snakeSansTete.forEach(morceau => {
        if(morceau.x === snake[0].x && morceau.y === snake[0].y){
            mordu = true;
        }
    })

    const toucheMurGauche = snake[0].x < -1;
    const toucheMurDroit = snake[0].x > canvas.width - 10;
    const toucheMurHaut = snake[0].y < -1;
    const toucheMurBas = snake[0].y > canvas.height -10;

    let gameOver = false;

    if(mordu || toucheMurBas || toucheMurDroit || toucheMurGauche || toucheMurHaut){
        gameOver = true;
    }
    
    return gameOver;
}

function recommencer(){
    const restart = document.querySelector('#recommencer');
    restart.style.display = "block";

    if(score > monRecord ){
        message.innerHTML = "Bravo, vous m'avez battu!!";
    }else{
        message.innerHTML = "Essayez encore!"
    }
    canvas.addEventListener('touchstart', (e) => {
        document.location.reload(true);
    })
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 32){
            document.location.reload(true);
        }
    })
}