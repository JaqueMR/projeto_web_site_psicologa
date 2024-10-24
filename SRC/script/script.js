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

/* Quando o usuário rola para baixo, esconde a navbar. Quando o usuário rola para cima, mostra a navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;

	document.getElementById("header").classList.add('scrolled');
	if (currentScrollPos === 0) {
		// console.log("Olá");
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

if (csaOK) {
	csaOK.onclick = () => {
		contactSubmitAfter.classList.remove('show');
		formSection.classList.remove('hide');
		contactSection.classList.remove('csa-cs');
		contactForm.classList.remove('csa-cf');
		contactButton.classList.remove('loading');
		contactLoad.classList.remove('show');
		submitText.classList.remove('hide');
		// contactSubmitAfter.classList.add('hide');
	}
}

// Função para validar o formulário
function validateForm(event) {
	event.preventDefault(); // Impede o envio do formulário
	let isValid = true;
	emailIsValid = true;
	nameIsValid = true;
	messageIsValid = true;

	// Verifica se o campo Nome está vazio
	if (nameInput.value.trim() === '') {
		isValid = false;
		nameIsValid = false;
	}

	// Verifica se o campo Email está vazio ou não é um endereço de e-mail válido
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

// Ouvinte de eventos para o envio do formulário
if (contactForm) {
	contactForm.addEventListener('submit', validateForm);
}

// Após adicionar a chave da API do Email Js na tag script do contact.html, descomente esta seção da função

function sendMail() {

	//  Remover a sessão ao adicionar a chave da API do Email Js na tag script do contact.html
	// De
	contactSubmitAfter.classList.add('show');
	formSection.classList.add('hide');
	contactSection.classList.add('csa-cs');
	contactForm.classList.add('csa-cf');
	// Para

	// var params = {
	// 	name: document.getElementById('name').value,
	// 	email: document.getElementById('email').value,
	// 	message: document.getElementById('message').value
	// }

	// const serviceID = "service_evf2wim";
	// const templateID = "template_v085uvl";

	// emailjs.send(serviceID, templateID, params)
	// 	.then(
	// 		res => {
	// 			document.getElementById('name').value = "";
	// 			document.getElementById('email').value = "";
	// 			document.getElementById('message').value = "";

	// 			contactSubmitAfter.classList.add('show');
	// 			formSection.classList.add('hide');
	// 			contactSection.classList.add('csa-cs');
	// 			contactForm.classList.add('csa-cf');

	// 		}
	// 	)
	// 	.catch((error) => {
	// 		console.log(error);
	// 	})
}
