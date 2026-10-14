const listaProdutos = document.getElementById("lista-produtos");
const totalProdutosSpan = document.getElementById("total-produtos");

const nomeProdutoInput = document.getElementById("produto-nome");
const precoProdutoInput = document.getElementById("produto-preco");
const estoqueProdutoInput = document.getElementById("produto-estoque");
const novoProdutoForm =  document.getElementById("form-produto");

const pesquisarProdutosInput =  document.getElementById("pesquisa-produtos");

let produtos = [
    {id:1, nome: "MOUSE", preco: 25.99, estoque: 5},
    {id:2, nome: "TECLADO", preco: 555.99, estoque: 1},
    {id:3, nome: "MONITOR", preco: 999.99, estoque: 0},
];


novoProdutoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    criarProduto(produtos);
    
});

listaProdutos.addEventListener("click", (e) =>{
    const targetBtn = e.target.closest(".delete-btn");

    if(targetBtn){
        deletarProduto(Number(targetBtn.dataset.id));
    }
    
});

pesquisarProdutosInput.addEventListener("input", () =>{
    
    buscarProdudutos();
});

function criarProduto(produtos){

    const nomeProduto = nomeProdutoInput.value.trim().toUpperCase();
    const precoProduto = Number(precoProdutoInput.value);
    const estoqueProduto = Number(estoqueProdutoInput.value); 

    let novoProduto = {
        id: proximoId(produtos),
        nome: nomeProduto,
        preco: precoProduto,
        estoque: estoqueProduto
    }

    produtos.push(novoProduto);
    atualizarContador(produtos);
    novoProdutoForm.reset();

    buscarProdudutos();
}

function proximoId(array){
    let idValido = 0;
    for(let i = 0; i < array.length; i++){
        if(idValido < array[i].id){
            idValido = array[i].id;
        }
    }

    idValido++;
    return idValido;
}

function deletarProduto(id){
    produtos = produtos.filter(p => p.id !== id);
    buscarProdudutos();
    atualizarContador(produtos);
}

function listarProdutos(produtos){
    listaProdutos.textContent = "";

    produtos.forEach(produto => {

        const precoFormatado = formatarPreco(produto.preco);

        const tableRow = document.createElement('tr');

        const tdNome = document.createElement('td');
        const spanNome = document.createElement('span');
        spanNome.textContent = produto.nome;
        spanNome.classList.add("product-name");
        tdNome.append(spanNome);
        

        const tdPreco = document.createElement('td');
        const spanPreco = document.createElement('span');
        spanPreco.textContent = precoFormatado
        tdPreco.append(spanPreco);

        const tdEstoque = document.createElement('td');
        const spanEstoque = document.createElement('span');
        spanEstoque.innerText = produto.estoque;
        spanEstoque.classList.add("stock-badge");
        tdEstoque.append(spanEstoque);

        const tdDeleteBtn = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "X";
        deleteBtn.dataset.id = produto.id;
        tdDeleteBtn.append(deleteBtn);

        tableRow.append(tdNome);
        tableRow.append(tdPreco);
        tableRow.append(tdEstoque);
        tableRow.append(tdDeleteBtn);
        listaProdutos.append(tableRow);
    });
}

function atualizarContador(produtos){
    const totalProdutos = produtos.length;

    const totalProdutosTxt = totalProdutos === 1 ? `${totalProdutos} produto`:`${totalProdutos} produtos`;

    totalProdutosSpan.innerText = totalProdutosTxt;
}

function formatarPreco(preco){
    const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
    });

    const precoFormatado = formatador.format(preco);

    return precoFormatado;
}

function buscarProdudutos(){
    const produtoPesquisado = pesquisarProdutosInput.value.trim().toUpperCase();

    let listaProcurados = produtos.filter(p => {return p.nome.includes(produtoPesquisado)});
    
    listarProdutos(listaProcurados);
}



listarProdutos(produtos);
atualizarContador(produtos);
