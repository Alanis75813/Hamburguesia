let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

$(document).ready(function(){

    atualizarCarrinho();

    $(".abrir-carrinho").click(function(){
        $("#carrinho").addClass("ativo");
    });

    $("#fechar").click(function(){
        $("#carrinho").removeClass("ativo");
    });

    $(".add").click(function(){

        let nome = $(this).data("nome");
        let preco = parseFloat($(this).data("preco"));

        let item = carrinho.find(p => p.nome === nome);

        if(item){
            item.qtd++;
        }else{
            carrinho.push({ nome, preco, qtd: 1 });
        }

        salvar();
        atualizarCarrinho();
    });

});

function atualizarCarrinho(){
    let lista = $("#lista");
    let total = 0;
    let qtdTotal = 0;

    lista.html("");

    carrinho.forEach((item, index) => {

        total += item.preco * item.qtd;
        qtdTotal += item.qtd;

        lista.append(`
            <li>
                <div>
                    ${item.nome} <br>
                    <small>R$ ${item.preco}</small>
                </div>

                <div class="controles">
                    <button onclick="diminuir(${index})">-</button>
                    ${item.qtd}
                    <button onclick="aumentar(${index})">+</button>
                </div>

                <button class="remover" onclick="remover(${index})">🗑️</button>
            </li>
        `);
    });

    $("#total").text(total.toFixed(2).replace(".", ","));
    $("#contador").text(qtdTotal);
}

function aumentar(i){
    carrinho[i].qtd++;
    salvar();
    atualizarCarrinho();
}

function diminuir(i){
    carrinho[i].qtd--;

    if(carrinho[i].qtd <= 0){
        carrinho.splice(i,1);
    }

    salvar();
    atualizarCarrinho();
}

function remover(i){
    carrinho.splice(i,1);
    salvar();
    atualizarCarrinho();
}

function salvar(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

$("#finalizar").click(function(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "🍔 *Pedido Hamburguesia* %0A%0A";

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} (x${item.qtd}) - R$ ${item.preco * item.qtd} %0A`;
    });

    let total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);

    mensagem += `%0A💰 *Total: R$ ${total.toFixed(2).replace(".", ",")}*`;

    // 👉 COLOQUE SEU NÚMERO AQUI (com DDD + país)
    let telefone = "5581999999999";

    let url = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(url, "_blank");

});

const menu = {
    bebidas: [
        { nome: "Coca-Cola", preco: 10, img: "mídias/bebidas.webp" },
        { nome: "Suco", preco: 15, img: "mídias/bebidas.webp" },
        { nome: "Milkshake", preco: 8, img: "mídias/bebidas.webp" }
    ],

    entradas: [
        { nome: "Batata Frita", preco: 10, img: "mídias/entradas e acompanhamentos.webp" },
        { nome: "Onion Rings", preco: 12, img: "mídias/entradas e acompanhamentos.webp" },
        { nome: "Coxinha", preco: 8, img: "mídias/entradas e acompanhamentos.webp" },
        { nome: "Chips de batata doce", preco: 10, img: "mídias/entradas e acompanhamentos.webp" }
    ],

    artesanais: [
        {nome: "hambúrguer de frango empanado", preco: 10, img: "mídias/hambúrgueres artesanais e veggies.webp"},
        {nome: "veggie burguer", preco: 20, img: "mídias/hambúrgueres artesanais e veggies.webp"},
        {nome: "Opção vegano com grão de bico", preco: 16, img: "mídias/hambúrgueres artesanais e veggies.webp"}
    ],

    hamburguer: [
        { nome: "X-Bacon", preco: 16, img: "mídias/hambúrgueres clássicos.webp" },
        { nome: "X-Salada", preco: 25, img: "mídias/hambúrgueres clássicos.webp" },
        { nome: "X-burguer tradicional", preco: 15, img: "mídias/hambúrgueres clássicos.webp" }
    ],
};

$(".categoria-card").click(function(){

    let categoria = $(this).data("categoria");
    let itens = menu[categoria];

    $("#tituloModal").text(categoria.toUpperCase());

    let html = "";

    itens.forEach(item => {
        html += `
            <div class="card">
                <img src="${item.img}">
                <h3>${item.nome}</h3>
                <span>R$ ${item.preco}</span>
                <button onclick="adicionar('${item.nome}', ${item.preco})">
                    Adicionar
                </button>
            </div>
        `;
    });

    $("#itensModal").html(html);

    $("#modal").addClass("ativo");
});

$("#fecharModal").click(function(){
    $("#modal").removeClass("ativo");
});
