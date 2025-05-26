const produtos = [
    {nome : "Teste0", preco: 10, categoria: "Categoria 1", disponibilidade: true},
    {nome : "Teste1", preco: 11, categoria: "Categoria 1", disponibilidade: false},
    {nome : "Teste2", preco: 12, categoria: "Categoria 1", disponibilidade: true},
    {nome : "Teste3", preco: 13, categoria: "Categoria 1", disponibilidade: false},
    {nome : "Teste4", preco: 14, categoria: "Categoria 1", disponibilidade: true},
    {nome : "Teste5", preco: 15, categoria: "Categoria 1", disponibilidade: false},
    {nome : "Teste6", preco: 16, categoria: "Categoria 2", disponibilidade: true},
    {nome : "Teste7", preco: 17, categoria: "Categoria 2", disponibilidade: false},
    {nome : "Teste8", preco: 18, categoria: "Categoria 2", disponibilidade: true},
    {nome : "Teste9", preco: 19, categoria: "Categoria 2", disponibilidade: false},
];

/**
 * Create the options of category dinamically.
 * 
 * Create options elements inside of an select HTML element
 * based on the list of products, getting just once the occurence
 * of the category. 
 */
function criarFiltroCategorias(){
    let filtroCategoria = document.getElementById("filtroCategoria");

    let categorias = new Set(produtos.map(produto => produto.categoria));
    
    categorias.forEach(categoria => {
        let option = document.createElement("option");
        option.text = categoria;
        option.value = categoria;
        filtroCategoria.appendChild(option);
    })
}

/**
 * List all the products.
 * 
 * Create all the cards for the entire products list,
 * reseting the filters.
 */
function listarProdutos() {
    criarProdutos(produtos)
}

/**
 * Create all the product cards.
 * 
 * Create for every product in the `listaProdutos` parameter a 
 * card showing all of its informations.
 * 
 * @param {Array<>} listaProdutos - List of products to be create the product card.
 */
function criarProdutos(listaProdutos){
    let containerProdutos = document.getElementById("container-produtos");

    containerProdutos.innerHTML = "";

    listaProdutos.forEach(produto => {
        let cardProduto = document.createElement("div");
        cardProduto.className = "produto";
        
        let nomeProduto = document.createElement("p");
        nomeProduto.className = "texto-produto";
        nomeProduto.innerText = produto.nome;
        cardProduto.appendChild(nomeProduto);

        let precoProduto = document.createElement("p");
        precoProduto.className = "texto-produto";
        precoProduto.innerText = `R$${produto.preco}`;
        cardProduto.appendChild(precoProduto);

        let categoriaProduto = document.createElement("p");
        nomeProduto.className = "texto-produto";
        categoriaProduto.innerText = produto.categoria;
        cardProduto.appendChild(categoriaProduto);

        let disponivelProduto = document.createElement("p");
        disponivelProduto.className = "texto-produto";
        let disponibilidade = produto.disponibilidade ? "Disponível" : "Indisponível";
        disponivelProduto.innerText = disponibilidade;
        cardProduto.appendChild(disponivelProduto);

        containerProdutos.appendChild(cardProduto);
    })
}

/**
 * Filter products by category and availability.
 * 
 * Get the values on the filter's form to know what products should be visible,
 * filtering by the category and availability, after creating a new list of
 * products create the cards for them.
 */
function filtrarProdutos() {
    let categoriaSelecionada = document.getElementById("filtroCategoria").value;
    
    let somenteDisponiveis = document.getElementById("filtroDisponivel").checked;

    let listaFiltrada = produtos.filter((produto) => {
        let isCategoriaSelecionada = produto.categoria == categoriaSelecionada;
        let isDisponivel = somenteDisponiveis
            ? produto.disponibilidade == true
            : true;

        return isCategoriaSelecionada && isDisponivel;
    })

    criarProdutos(listaFiltrada)
}

criarFiltroCategorias();
listarProdutos();

document.getElementById("forms").addEventListener("submit", (e) => { 
    e.preventDefault();
    filtrarProdutos();
})