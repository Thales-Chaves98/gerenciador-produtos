const produtos = [
    {id:1, nome: "Mouse", preco: 25.99, estoque: 5},
    {id:2, nome: "Teclado", preco: 555.99, estoque: 1},
    {id:3, nome: "Monitor", preco: 999.99, estoque: 0},
];


function listarProdutos(produtos){

    for(i = 0; i < produtos.length; i++){
        console.log(produtos[i]);
    }
}

listarProdutos(produtos);