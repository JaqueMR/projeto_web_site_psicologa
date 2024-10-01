// Seleciona o elemento do menu e o ícone de menu
let menu = document.querySelector('#menu-icon-js'); // Eu seleciono o ícone do menu para adicionar funcionalidade de clique
let menuicon = document.querySelector('#menu-icon'); // Aqui, seleciono o ícone específico para mudar a aparência dele
let navbar = document.querySelector('.navbar'); // Esse código seleciona a barra de navegação
let navtc = document.querySelector('#nav-tc-js'); // Eu pego o elemento que fecha a navegação quando clico nele

// Adiciono um evento de clique ao ícone do menu
menu.onclick = () => {
    // Aqui, estou alternando a classe 'bx-x' no ícone do menu, o que muda a aparência dele
    menuicon.classList.toggle('bx-x');
    // Essa linha alterna a classe 'open' na barra de navegação, abrindo ou fechando o menu
    navbar.classList.toggle('open');
    // Também alterno a classe que mostra ou esconde o fechamento do menu
    navtc.classList.toggle("nav-touch-close-open");
}

// Adiciona um evento de clique ao elemento que fecha a navegação
navtc.onclick = () => {
    // Quando clico para fechar o menu, ele remove a classe 'bx-x' para restaurar a aparência original do ícone
    menuicon.classList.toggle('bx-x');
    // Aqui eu removo a classe 'open' para fechar o menu
    navbar.classList.remove('open');
    // Removo as classes que controlam o fechamento do menu
    navtc.classList.remove('nav-touch-close-open');
    navtc.classList.remove("nav-tc-z"); // Também removo as classes de estilo de toque
    navtc.classList.remove("nav-LR-TC");
}

// Variável para armazenar a posição de rolagem anterior
var prevScrollpos = window.pageYOffset; // Aqui salvo a posição anterior da rolagem

// Adiciona um evento de rolagem na janela
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset; // Aqui eu guardo a posição atual da rolagem

    // Adiciono a classe 'scrolled' ao cabeçalho quando rolar a página
    document.getElementById("header").classList.add('scrolled');
    
    // Se a rolagem voltar ao topo, eu removo a classe 'scrolled'
    if (currentScrollPos === 0) {
        document.getElementById("header").classList.remove('scrolled');
    }

    // Se o menu estiver aberto no toque, não faço nada
    if (navtc.classList.contains('nav-touch-close-open')) {
        return;
    }

    // Aqui, controlo a visibilidade do cabeçalho baseado na direção da rolagem
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0"; // Se a rolagem for para cima, mostro o cabeçalho
    } else {
        document.getElementById("header").style.top = "-100px"; // Se rolar para baixo, escondo o cabeçalho
    }

    // Atualizo a posição anterior de rolagem
    prevScrollpos = currentScrollPos;
}

