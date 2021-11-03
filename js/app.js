tsParticles.loadJSON("tsparticles",
"presets/default.json").then((container) => {
console.log("callback - tsparticles config loaded");
})
.catch((error) => {
console.error(error);
});

let age = document.querySelector('#age');
let annee = document.querySelector('#annee');

annee.innerText = (new Date()).getFullYear();
age.innerText = annee.innerText - 1986;
