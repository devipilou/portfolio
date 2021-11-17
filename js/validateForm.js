const inpName = document.querySelector('#name');
const inpMail = document.querySelector('#email');
const inpMessage = document.querySelector('#message');
const btnSub = document.querySelector('form button');
const messSub = document.querySelector('#submit-message');



const allImg = document.querySelectorAll('.form-group img');
const allSpan = document.querySelectorAll('.form-group span');

// objet de stockage des champs validés
const controleValidation = {
    name : 0,
    mail : 0,
    message : 0
};

// validation Name
inpName.addEventListener('input', (e) => {

    let regexName = /^\w+$/g;
    // console.log(e.target.value)

    if(e.target.value.match(regexName)){
        allImg[0].style.display = "inline";
        allImg[0].src = "assets/check.png";
        allSpan[0].style.display = "none";
        controleValidation['name'] = 1;
    }else{
        allImg[0].style.display = "inline";
        allImg[0].src = "assets/error.png";
        allSpan[0].style.display = "inline";
        controleValidation['name'] = 0;
    }
    // console.log(controleValidation);
    affichageBtn();

});

// validation Email
inpMail.addEventListener('input', (e) => {

    let regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(e.target.value);

    if(e.target.value.match(regexMail)){
        allImg[1].style.display = "inline";
        allImg[1].src = "assets/check.png";
        allSpan[1].style.display = "none";
        controleValidation['mail'] = 1;
    }else{
        allImg[1].style.display = "inline";
        allImg[1].src = "assets/error.png";
        allSpan[1].style.display = "inline";
        controleValidation['mail'] = 0;
    }
    // console.log(controleValidation);
    affichageBtn();

});

// validation Message
inpMessage.addEventListener('input', (e) => {
    if(e.target.value.length >= 1){
        allImg[2].style.display = "inline";
        allImg[2].src = "assets/check.png";
        allSpan[2].style.display = "none";
        controleValidation['message'] = 1;
    }else{
        allImg[2].style.display = "inline";
        allImg[2].src = "assets/error.png";
        allSpan[2].style.display = "inline";
        controleValidation['message'] = 0;
    }
    // console.log(controleValidation);
    affichageBtn();
});

// affichage du btn submit si tout est validé
function affichageBtn(){

    if((controleValidation['name'] === 1) && (controleValidation['mail'] === 1) && (controleValidation['message'] === 1)){
        btnSub.classList.remove('disabled')
        btnSub.classList.add('btn-lg', 'shadow')
        messSub.style.display = "none";
    }else{
        btnSub.classList.add('disabled')
        btnSub.classList.remove('btn-lg', 'shadow')
        messSub.style.display = "inline";
    }
};