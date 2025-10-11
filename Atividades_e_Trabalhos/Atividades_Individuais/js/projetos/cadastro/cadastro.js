const usuarios = [];

// Telas
const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");

// Botões
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltarLista = document.querySelector("#btn-voltar-lista");

// Inputs
const inputId = document.querySelector("#user-id");
const inputNome = document.querySelector("#user-nome");
const inputSobrenome = document.querySelector("#user-sobrenome");
const inputEmail = document.querySelector("#user-cep");
const inputCep = document.querySelector("#user-cep");
const inputRua = document.querySelector("#user-rua");
const inputBairro = document.querySelector("#user-bairro");
const inputCidade = document.querySelector("#user-cidade");
const inputEstado = document.querySelector("#user-estado");
const inputObs = document.querySelector("#user-obs");

// Funções

function mostrarTelaLista(){
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
}

function mostrarTelaCadastro(){
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function inicializar(){
    btnAdicionar.addEventListener("click",mostrarTelaCadastro);
    btnVoltarLista.addEventListener("click",mostrarTelaLista);
}

inicializar();