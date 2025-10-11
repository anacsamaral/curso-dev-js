const usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [];

const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");

const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltarLista = document.querySelector("#btn-voltar-lista");

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");

const inputNome = document.querySelector("#user-nome");
const inputSobrenome = document.querySelector("#user-sobrenome");
const inputEmail = document.querySelector("#user-email");
const inputCep = document.querySelector("#user-cep");
const inputRua = document.querySelector("#user-rua");
const inputNumero = document.querySelector("#user-numero");
const inputComplemento = document.querySelector("#user-complemento");
const inputBairro = document.querySelector("#user-bairro");
const inputCidade = document.querySelector("#user-cidade");
const inputEstado = document.querySelector("#user-estado");
const inputObs = document.querySelector("#user-obs");

function salvarStorage() {
    localStorage.setItem("cadastro_usuarios", JSON.stringify(usuarios));
}

function mostrarTelaLista() {
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
    renderizarTabela();
}

function mostrarTelaCadastro() {
    form.reset();
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function renderizarTabela() {
    tabelaCorpo.innerHTML = "";

    if (usuarios.length === 0) {
        tabelaCorpo.innerHTML = `<tr><td colspan="3">Nenhum usuário cadastrado.</td></tr>`;
        return;
    }

    usuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

function handleSalvarUsuario(event) {
    event.preventDefault();

    const usuario = {
        id: Date.now(),
        nome: inputNome.value,
        sobrenome: inputSobrenome.value,
        email: inputEmail.value,
        cep: inputCep.value,
        rua: inputRua.value,
        numero: inputNumero.value,
        complemento: inputComplemento.value,
        bairro: inputBairro.value,
        cidade: inputCidade.value,
        estado: inputEstado.value,
        obs: inputObs.value,
    };

    usuarios.push(usuario);
    salvarStorage();
    mostrarTelaLista();
}

function inicializar() {
    btnAdicionar.addEventListener("click", mostrarTelaCadastro);
    btnVoltarLista.addEventListener("click", mostrarTelaLista);
    form.addEventListener("submit", handleSalvarUsuario);
    
    mostrarTelaLista();
}

inicializar();