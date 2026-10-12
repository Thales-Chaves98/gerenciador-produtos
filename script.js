const listaProdutos = document.getElementById("lista-produtos");


const produtos = [
    {id:1, nome: "Mouse", preco: 25.99, estoque: 5},
    {id:2, nome: "Teclado", preco: 555.99, estoque: 1},
    {id:3, nome: "Monitor", preco: 999.99, estoque: 0},
];


function listarProdutos(produtos){
    listaProdutos.textContent = "";

    produtos.forEach(produto => {

        let precoFormatado = formatarPreco(produto.preco);

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


        tableRow.append(tdNome);
        tableRow.append(tdPreco);
        tableRow.append(tdEstoque);
        listaProdutos.append(tableRow);
    });

}

function formatarPreco(preco){
    const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
    });

    const precoFormatado = formatador.format(preco);

    return precoFormatado;
}

listarProdutos(produtos);