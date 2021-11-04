if (window.matchMedia("(min-width: 769px)").matches) {
    /* La largeur minimum de l'affichage est 769px inclus */
    tsParticles.loadJSON("tsparticles",
    "presets/default.json").then((container) => {
    console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
    console.error(error);
    });
  }else{
    tsParticles.loadJSON("tsparticles",
    "presets/defaultSmDevices.json").then((container) => {
    console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
    console.error(error);
    });
  }


let age = document.querySelector('#age');
let annee = document.querySelector('#annee');
let modifAge = 0

annee.innerText = (new Date()).getFullYear();

if ((new Date()).getMonth() < 3){
modifAge = 1;
}else if ((new Date()).getMonth() == 3){
    if ((new Date()).getDate() < 18){
        modifAge = 1;
    }
};

age.innerText = annee.innerText - 1986 - modifAge;
