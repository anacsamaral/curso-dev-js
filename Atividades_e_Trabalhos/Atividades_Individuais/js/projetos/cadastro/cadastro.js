let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [];

//Telas
const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");

//Botões
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltarLista = document.querySelector("#btn-voltar-lista");
const btnDownload = document.querySelector("#btn-download");
const btnUpload = document.querySelector("#btn-upload");

//Inputs
const inputId = document.querySelector("#user-id");
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
const inputBusca = document.querySelector("#user-busca");
const inputUpload = document.querySelector("#input-upload");
const inputDownload = document.querySelector("#input-download");

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");
const btnCep = document.querySelector("#btn-buscar-cep");

let idEdicao = null;


function mostrarTelaLista() {
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
    renderizarTabela();
}

function mostrarTelaCadastro() {
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function salvarUsuario() {
    const id = Number(inputId.value);
    const nome = inputNome.value;
    const sobrenome = inputSobrenome.value;
    const email = inputEmail.value;
    const cep = inputCep.value;
    const rua = inputRua.value;
    const numero = inputNumero.value;
    const complemento = inputComplemento.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const obs = inputObs.value;


    const usuario = {
        id: id || Date.now(), nome, sobrenome, email, cep, rua, numero, complemento, bairro, cidade, estado, obs
    }

    if (idEdicao) { // se em edição, salvar as informações do usuário

        const index = usuarios.findIndex(user => user.id === idEdicao); // 1 usuário = index 0
        if (index !== -1) {
            usuarios[index] = usuario;
        }


    } else { // se não, inserir novo usuário
        usuarios.push(usuario);
    }

    salvarNoStorage();
    form.reset();
    mostrarTelaLista;
}

function salvarNoStorage() {
    localStorage.setItem("cadastro_usuarios", JSON.stringify(usuarios));
}

function renderizarTabela(usuariosFiltrados = usuarios) {
    tabelaCorpo.innerHTML = "";
    usuariosFiltrados.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning" data-id="${user.id}">Editar</button>

                <button type="button" class="btn btn-sm btn-danger" data-id="${user.id}">Excluir</button>
            </td>
        `;

        tabelaCorpo.appendChild(tr);
    });

}

function excluirUsuario(id) {
    if (confirm("Você deseja realmente excluir esse usuário?")) {
        console.log(id);
        usuarios = usuarios.filter(user => user.id !== id);
        salvarNoStorage();
        renderizarTabela();
    }
}

function editarUsuario(id) {
    const usuario = usuarios.find(user => user.id === id);

    if (!usuario) return;

    idEdicao = id;

    inputId.value = usuario.id;
    inputNome.value = usuario.nome;
    inputSobrenome.value = usuario.sobrenome;
    inputEmail.value = usuario.email;
    inputCep.value = usuario.cep;
    inputRua.value = usuario.rua;
    inputNumero.value = usuario.numero;
    inputComplemento.value = usuario.complemento;
    inputBairro.value = usuario.bairro;
    inputCidade.value = usuario.cidade;
    inputEstado.value = usuario.estado;
    inputObs.value = usuario.obs;

    mostrarTelaCadastro();
}

async function buscarCEP() {
    const cep = inputCep.value.replace(/\D/g,"");
    if (cep.length === 8) {

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        const dados = await resposta.json();

        console.log(dados);

        if (!dados.erro) {
            inputCep.value = dados.cep;
            inputRua.value = dados.logradouro;
            inputComplemento.value = dados.complemento;
            inputBairro.value = dados.bairro;
            inputCidade.value = dados.localidade;
            inputEstado.value = dados.estado;
        }
        else{
            alert("CEP Inválido, tente novamente!")
        }

    } else {
        alert("Verifique a quantidade de números digitados!")
    }
}

function buscarUsuario(){
    // toLowerCase => transforma tudo em minusculo
    // trim => remove os espaços dos extremos
    const conteudo = inputBusca.value.toLowerCase().trim();

    if(!conteudo){
        renderizarTabela();
        return;
    }

    const usuariosFiltrados = usuarios.filter(user => {
        return user.nome.toLowerCase().trim().includes(conteudo) || user.sobrenome.toLowerCase().trim().includes(conteudo) || user.email.toLowerCase().trim().includes(conteudo);
    });

    console.log(usuariosFiltrados);
    renderizarTabela(usuariosFiltrados);
}

function downloadArquivo(){
    const dados = JSON.stringify(usuarios);
    const arquivo = new Blob([dados], {type: "application/json"});
    const url = URL.createObjectURL(arquivo);
    const linkDownload = document.createElement("a");
    linkDownload.href = url;
    linkDownload.download = "usuarios.json";
    linkDownload.click();
    URL.revokeObjectURL(url);
}

function uploadArquivo(event){
    console.log("teste");

    const arquivo = event.target.files[0];

    if(!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function(e){
        // pega o resultado da leitura do arquivo
        const conteudoArquivo = e.target.result;
        const usuariosImportados = JSON.parse(conteudoArquivo);

        if(!Array.isArray(usuariosImportados)){
            alert("Arquivo não é um array válido");
        }

        if(confirm("Deseja realmente substituir as informações dos usuários?")){
            usuarios = usuariosImportados;
            salvarNoStorage();
            renderizarTabela();
            alert("Usuários importados com sucesso!");
            inputUpload.value = "";
            //location.reload(true);
        }
    }
    leitor.readAsText(arquivo);
}

function inicializar() {
    btnAdicionar.addEventListener("click", mostrarTelaCadastro);
    btnVoltarLista.addEventListener("click", mostrarTelaLista);
    btnCep.addEventListener("click", buscarCEP);

    form.addEventListener("submit", salvarUsuario);
    mostrarTelaLista();

    inputBusca.addEventListener("input",buscarUsuario);

    btnDownload.addEventListener("click", downloadArquivo);
    btnUpload.addEventListener("click", () => inputUpload.click());
    inputUpload.addEventListener("change",uploadArquivo);

    tabelaCorpo.addEventListener("click", (event) => {
        const target = event.target.closest("button");
        if (!target) return

        const id = Number(target.dataset.id);

        if (isNaN(id)) return

        if (target.classList.contains("btn-warning")) {
            editarUsuario(id);
        } else if (target.classList.contains("btn-danger")) {
            excluirUsuario(id);
        }
    })
}

inicializar();