document.querySelector('.seu-nome').textContent = "Ana Amaral";

// Mapeamento

const PRECO_POR_PAGINA = 500;
const PRECO_DESIGN_ADICIONAL = 1000;

const inputPaginas = document.querySelector("#qtd-paginas");
const inputDesconto = document.querySelector("#desconto");
const inputMensalidade = document.querySelector("#mensalidade");
const checkboxDesign = document.querySelector("#inclui-design");
const inputPrazo = document.querySelector("#prazo-entrega");
const resumoSubtotal = document.querySelector("#resumo-subtotal");
const resumoAdicional = document.querySelector("#resumo-adicional");
const resumoUrgencia = document.querySelector("#resumo-urgencia");
const resumoDesconto = document.querySelector("#resumo-desconto");
const resumoTotal = document.querySelector("#resumo-total");
const resumoMensalidade = document.querySelector("#resumo-mensalidade");

const calcularSubtotal = (quantidade) => quantidade * PRECO_POR_PAGINA;
const calcularValorDesconto = (valor, porcentagem) => valor * (porcentagem / 100);

function calcularTaxaUrgencia(valor, prazo) {
    if (prazo > 0 && prazo < 5)
        return valor * 0.1;
    else if (prazo >= 5 && prazo < 15)
        return valor * 0.05;
    else
        return valor * 0;
}

function atualizarOrcamento(){
    const qtdPaginas = Number(inputPaginas.value);
    const porcentagemDesconto = Number(inputDesconto.value);
    const prazo = Number(inputPrazo.value);
    const designIncluido = checkboxDesign.checked; // se checado, retorna true, senão, false
    const mensalidade = Number(inputMensalidade.value);

    const subtotal = calcularSubtotal(qtdPaginas);
    const adicionalDesign = designIncluido ? PRECO_DESIGN_ADICIONAL : 0;
    const taxaUrgencia = calcularTaxaUrgencia((subtotal + adicionalDesign), prazo);
    const desconto = calcularValorDesconto((subtotal + adicionalDesign + taxaUrgencia),porcentagemDesconto);
    const total = (subtotal + adicionalDesign + taxaUrgencia) - desconto;
    const formatarValor = valor => valor.toLocaleString("pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

    resumoSubtotal.textContent = formatarValor(subtotal);
    resumoAdicional.textContent = formatarValor(adicionalDesign);
    resumoUrgencia.textContent = formatarValor(taxaUrgencia);
    resumoDesconto.textContent = formatarValor(desconto)
    resumoTotal.textContent = formatarValor(total);
    resumoMensalidade.textContent = formatarValor(mensalidade);
}

const todosInputs = [inputPaginas, inputPrazo, inputDesconto, checkboxDesign, inputMensalidade];

todosInputs.forEach(input => {
    input.addEventListener('input', atualizarOrcamento);
});