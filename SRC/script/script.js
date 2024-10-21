// Seleciona elementos do DOM
let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    navtc.classList.toggle("nav-touch-close-open");
}

navtc.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.remove('open');
    navtc.classList.remove('nav-touch-close-open');
    navtc.classList.remove("nav-tc-z");
    navtc.classList.remove("nav-LR-TC");
}

// Esconde a navbar ao rolar para baixo e a mostra ao rolar para cima
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    document.getElementById("header").classList.add('scrolled');
    if (currentScrollPos === 0) {
        document.getElementById("header").classList.remove('scrolled');
    }
    if (navtc.classList.contains('nav-touch-close-open')) {
        return;
    }
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}

// Seções do formulário de contato
const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

// Fechar a mensagem de sucesso
if (csaOK) {
    csaOK.onclick = () => {
        contactSubmitAfter.classList.remove('show');
        formSection.classList.remove('hide');
        contactSection.classList.remove('csa-cs');
        contactForm.classList.remove('csa-cf');
        contactButton.classList.remove('loading');
        contactLoad.classList.remove('show');
        submitText.classList.remove('hide');
    }
}

// Função para validar o formulário
function validateForm(event) {
    event.preventDefault(); // Impede o envio do formulário
    let isValid = true;
    let emailIsValid = true;
    let nameIsValid = true;
    let messageIsValid = true;

    // Verifica se o campo 'Nome' está vazio
    if (nameInput.value.trim() === '') {
        isValid = false;
        nameIsValid = false;
    }

    // Verifica se o campo 'Email' está vazio ou não é um endereço de e-mail válido
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        isValid = false;
        if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
            emailIsValid = false;
        }
    }

    // Verifica se o campo Mensagem está vazio
    if (messageInput.value.trim() === '') {
        isValid = false;
        messageIsValid = false;
    }

    if (!isValid) {
        // Exibe a mensagem de erro
        errorDiv.classList.add('error-show');
        emailErrorDiv.classList.remove('error-show');
        if (nameIsValid && messageIsValid && !emailIsValid) {
            errorDiv.classList.remove('error-show');
            emailErrorDiv.classList.add('error-show');
        }
    } else {
        // O formulário é válido, pode ser enviado agora
        emailErrorDiv.classList.remove('error-show');
        errorDiv.classList.remove('error-show');
        contactButton.classList.add('loading');
        contactLoad.classList.add('show');
        submitText.classList.add('hide');
        setTimeout(function () {
            sendMail();
        }, 2000);
    }
}

// Função para validar o formato do e-mail usando uma expressão regular
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
}

// Função para enviar o e-mail
function sendMail() {
    const params = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };

    const serviceID = "service_evf2wim"; 
    const templateID = "template_v085uvl"; 
    const apiKey = 'yfFEoHDf60MTXLEaI'; //  Chave da API 


    emailjs.init(apiKey); // Inicializa com a chave da API

    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            // Limpa os campos do formulário
            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";

            // Exibe mensagem de sucesso
            contactSubmitAfter.classList.add('show');
            formSection.classList.add('hide');
            contactSection.classList.add('csa-cs');
            contactForm.classList.add('csa-cf');
        })
        .catch((error) => {
            console.error(error);
            // Exiba uma mensagem de erro ao usuário, se necessário
        });
}
