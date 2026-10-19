const listaProdutos = document.getElementById("lista-produtos");
const totalProdutosSpan = document.getElementById("total-produtos");

const nomeProdutoInput = document.getElementById("produto-nome");
const precoProdutoInput = document.getElementById("produto-preco");
const estoqueProdutoInput = document.getElementById("produto-estoque");
const novoProdutoForm =  document.getElementById("form-produto");

const painelEdicao = document.getElementById("painel-edicao");
const formEdicao = document.getElementById("form-edicao");
const editarNome = document.getElementById("edicao-nome");
const editarPreco = document.getElementById("edicao-preco");
const editarEstoque = document.getElementById("edicao-estoque");
const cancelarEditar = document.getElementById("cancelar-edicao");

const mensagemform = document.getElementById("mensagem-form")

const pesquisarProdutosInput =  document.getElementById("pesquisa-produtos");

let produtos = [];

let editingId = null;

novoProdutoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    criarProduto(produtos);
    
});

listaProdutos.addEventListener("click", (e) =>{
    const deleteBtn = e.target.closest(".delete-btn");
    const editBtn = e.target.closest(".edit-btn");

    if(deleteBtn){
        deletarProduto(Number(deleteBtn.dataset.id));
    } else if(editBtn){
        abrirEdicao(Number(editBtn.dataset.id));
    }
    
});

pesquisarProdutosInput.addEventListener("input", () =>{
    
    buscarProdutos();
});

formEdicao.addEventListener("submit", (e) =>{
    e.preventDefault();

    const produtoEmEdicao = produtos.find(p => p.id === editingId);

    if(!produtoEmEdicao) return;

    const novoNome = editarNome.value.trim().toUpperCase();

    const produtoRepetido = produtos.some(p => p.nome === novoNome && p.id !== editingId);

    if(produtoRepetido){
       
        return;
    };

    if(novoNome === "" ) return;

    produtoEmEdicao.nome = novoNome;
    produtoEmEdicao.preco = Number(editarPreco.value);
    produtoEmEdicao.estoque = Number(editarEstoque.value);

    salvarProdutos(produtos);
    buscarProdutos();
    painelEdicao.hidden = true;

    editingId = null;
});

cancelarEditar.addEventListener("click", () =>{
    painelEdicao.hidden = true;
    editingId = null;
});

function criarProduto(produtos){

    const nomeProduto = nomeProdutoInput.value.trim().toUpperCase();
    const precoProduto = Number(precoProdutoInput.value);
    const estoqueProduto = Number(estoqueProdutoInput.value); 

    if(nomeProduto === "" || precoProduto === 0 ) return;

    let novoProduto = {
        id: proximoId(produtos),
        nome: nomeProduto,
        preco: precoProduto,
        estoque: estoqueProduto
    }

    const produtoRepetido = produtos.some(p => p.nome === nomeProduto);

    if(produtoRepetido){
        mensagemform.textContent = "JÁ EXISTE UM PRODUTO COM ESSE NOME !";
        return
    };

    mensagemform.textContent = "";
    produtos.push(novoProduto);
    atualizarContador(produtos);
    novoProdutoForm.reset();

    buscarProdutos();
    salvarProdutos(produtos);
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
    buscarProdutos();
    atualizarContador(produtos);
    salvarProdutos(produtos);
}

function abrirEdicao(id){
    editingId = id;
    const editarprodutoId = produtos.find(p => p.id === id);
    
    if(!editarprodutoId) return;
    
    painelEdicao.hidden = false;

    editarNome.value = editarprodutoId.nome;
    editarPreco.value = editarprodutoId.preco;
    editarEstoque.value = editarprodutoId.estoque;


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

        const tdAcoes = document.createElement("td");

        const deleteBtn = document.createElement("button");
        const deleteBtnSpan = document.createElement("span");
        deleteBtn.classList.add("delete-btn");
        deleteBtnSpan.textContent = "delete_forever";
        deleteBtn.dataset.id = produto.id;
        deleteBtn.append(deleteBtnSpan);
        tdAcoes.append(deleteBtn);

        const editBtn = document.createElement("button");
        const editBtnSpan = document.createElement("span");
        editBtn.classList.add("edit-btn");
        editBtnSpan.textContent = "edit";
        editBtn.dataset.id = produto.id;
        editBtn.append(editBtnSpan);
        tdAcoes.append(editBtn);

        tableRow.append(tdNome);
        tableRow.append(tdPreco);
        tableRow.append(tdEstoque);
        tableRow.append(tdAcoes);
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

function buscarProdutos(){
    const produtoPesquisado = pesquisarProdutosInput.value.trim().toUpperCase();

    let listaProcurados = produtos.filter(p => {return p.nome.includes(produtoPesquisado)});
    
    listarProdutos(listaProcurados);
}

function salvarProdutos(produtos){
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function carregarProdutos(){
    const dadosSalvos = localStorage.getItem("produtos");
    if(dadosSalvos !== null){
        const produtosSalvos = JSON.parse(dadosSalvos);

        produtos = produtosSalvos;
    }
}

carregarProdutos();
listarProdutos(produtos);
atualizarContador(produtos);
