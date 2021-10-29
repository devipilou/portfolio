tsParticles.loadJSON("tsparticles",
"presets/default.json").then((container) => {
console.log("callback - tsparticles config loaded");
})
.catch((error) => {
console.error(error);
});