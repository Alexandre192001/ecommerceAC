    const btnForm = document.querySelector(".btn-enviarForm")
btnForm.addEventListener("click", (e)=>{
    e.preventDefault()
})


const menuHamburguer = document.querySelector(".bi-list")
menuHamburguer.addEventListener("click",()=>{
    document.querySelector(".navbar").classList.add("menuVisible")
})

const closeMenuHamburguer = document.querySelector(".bi-x-circle-fill")
closeMenuHamburguer.addEventListener("click",()=>{
    document.querySelector(".navbar").classList.remove("menuVisible")
})


const linksMenuHamburguer = document.querySelectorAll(".menuLink")
linksMenuHamburguer.forEach((linksBtn)=>{
    linksBtn.addEventListener("click",function(){
        document.querySelector(".navbar").classList.remove("menuVisible")
    })
})


const dark = document.querySelector(".bi-moon-stars-fill")
let sobremim = document.querySelector("#sobremim")
let compras = document.querySelector("#compras")
let contato = document.querySelector("#contato")
let footer = document.querySelector(".container-footer-wrapper")

dark.addEventListener("click", function () {
    if (this.classList.toggle("bi-sun-fill")) {
        this.classList.remove("bi-moon-stars-fill")
        sobremim.classList.add("dark")
        compras.classList.add("dark")
        contato.classList.add("dark")
        footer.classList.add("dark")
    } else if (this.classList.toggle("bi-moon-stars-fill")) {
        this.classList.remove("bi-sun-fill")
        sobremim.classList.remove("dark")
        compras.classList.remove("dark")
        contato.classList.remove("dark")
        footer.classList.remove("dark")
    }
})


const carVisible = document.querySelector(".bi-basket-fill")
carVisible.addEventListener("click",()=>{
    document.querySelector(".container-carrinhoCompras-wrapper").classList.add("carrinhoVisible")
})

const carHidden = document.querySelector(".closed-car i ")
carHidden.addEventListener("click",()=>{
    document.querySelector(".container-carrinhoCompras-wrapper").classList.remove("carrinhoVisible")
})



var totalCompras = "0,00"

const btnFinalizarCompras = document.querySelector(".finallyCompras")
btnFinalizarCompras.addEventListener("click", finishCompras)

const removeItem = document.querySelectorAll(".remove-item")
for (let i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener("click", removerItem)
    const qtdProduct = document.querySelectorAll(".qtd-input")
    for(let i = 0 ; i<qtdProduct.length;i++){
        qtdProduct[i].addEventListener("change", checkQtdIsNull)
    }
}

const addCard=document.querySelectorAll(".btn-comprar")
    for(let i = 0; i<addCard.length;i++){
        addCard[i].addEventListener("click", createElementCard)
}

function createElementCard(event){
    const buttonClass  = event.target
    const cardWrapper = buttonClass.closest(".card")
    const titleCard = cardWrapper.querySelector(".title-card").innerText
    const valueCard = cardWrapper.querySelector(".value-card").innerText
    const imgCard = cardWrapper.querySelector(".img-card img").src
    
    const produtoCardTitle = document.querySelectorAll(".title-item")
    for(let i = 0; i<produtoCardTitle.length;i++){
        if(produtoCardTitle[i].innerText===titleCard){
         produtoCardTitle[i].parentElement.parentElement.querySelector(".qtd-input").value++
         updateCard()
         return
        }
    }

    const trTableCar = document.createElement("tr")
    trTableCar.setAttribute("class","item-card")
    trTableCar.innerHTML = 
    `
    <td class="img-item"><img width="80px" src="${imgCard}" alt=""> <h3 class="title-item">${titleCard}</h3></td>
    <td class="preco-item">${valueCard}</td>
    <td ><input class="qtd-input" type="number" value="1"></td>
    <td><button class="remove-item">Remover <i class="bi bi-trash"></i></button></td>
    `
    document.querySelector(".container-body-table").append(trTableCar)
    updateCard()
    trTableCar.querySelectorAll(".qtd-input")[0].addEventListener("change",checkQtdIsNull)
    trTableCar.querySelectorAll(".remove-item")[0].addEventListener("click", removerItem)
}

function checkQtdIsNull(event){
    if(event.target.value==="0"){
        event.target.closest(".item-card").remove()
    }
    updateCard()
}

function removerItem(event) {
    event.target.closest(".item-card").remove()
    updateCard()
    
}

function updateCard() {
    totalCompras = 0
    const cardProdutos = document.querySelectorAll(".item-card")
    for (let i = 0; i < cardProdutos.length; i++) {
        const values = cardProdutos[i].querySelector(".preco-item").innerText
        .replace("R$", "").replace(",", ".")
        const qtdItem = cardProdutos[i].querySelector(".qtd-input").value
        totalCompras += (values * qtdItem)
        document.querySelector(".total-car").innerText = "R$ " +  totalCompras.toFixed(2).replace(".",",")
    }
}

function finishCompras(){
    if(totalCompras ==="0,00" || totalCompras===0){
        alert("Carrinho de compras vazio")
    } else {
    alert(  `   
        Obrigado pela compra
        Valor total do pedido :R$ ${totalCompras}
        Volte Sempre :)
        `)
    }

    document.querySelector(".container-body-table").innerHTML = ''
    document.querySelector(".total-car").innerText="R$ 0,00"
    updateCard()
}