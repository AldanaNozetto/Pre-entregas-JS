class Alimento {
  constructor(id, categoria, nombre, precio, enStock) {
    this.id = id
    this.categoria = categoria
    this.nombre = nombre
    this.precio = parseFloat(precio)
    this.enStock = enStock
  }

  sumarGanancia() {
    this.precio *= 1.5
  } // cambia los precios
}

const alimentos = [] // lista que contendra las instancias

const alimento1 = new Alimento(1, "comida", "Pizza", 35, true)
alimentos.push(alimento1)
const alimento2 = new Alimento(2, "comida", "Tacos", 33, true)
alimentos.push(alimento2)
const alimento3 = new Alimento(3, "comida", "Hamburguesa", 40, false)
alimentos.push(alimento3)
const alimento4 = new Alimento(4, "bebida", "Sprite", 20, true)
alimentos.push(alimento4)
const alimento5 = new Alimento(5, "bebida", "Limonada", 15, true)
alimentos.push(alimento5)
const alimento6 = new Alimento(6, "bebida", "Coca-Cola", 20, true)
alimentos.push(alimento6)

// aplica la ganancia del 50% a todos los productos, una sola vez
alimentos.forEach(alimento => alimento.sumarGanancia())

console.log(alimentos)
console.table(alimentos)

const carrito = []

function imprimirAlimentosEnHTML(alimentos) {
    const containerAlimentos = document.getElementById("alimentos")
    containerAlimentos.innerHTML = ""

    for (const alimento of alimentos) {
        const card = document.createElement("article")
        card.className = "card"

        card.innerHTML = `
        <h3>${alimento.nombre}</h3>
        <p>Precio: $${alimento.precio}</p>
        <button class="card-boton" id="${alimento.id}${alimento.nombre}" ${alimento.enStock ? "" : "disabled"}>
        ${alimento.enStock ? "Agregar al carrito" : "Agotado"}
        </button>
        `

        containerAlimentos.append(card)

        const cardBtn = document.getElementById(`${alimento.id}${alimento.nombre}`)
        cardBtn.addEventListener("click", () => {
            carrito.push(alimento)
            imprimirCarrito(carrito)
        })
    }
}

function imprimirCarrito(array) {
    const contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ""  // esto hace que se vacie el carrito, asi no se duplica la info

    for (const element of array) {
        const div = document.createElement("div")
        div.innerHTML = `<p>${element.nombre}</p>
        <p>${element.precio}</p>`

        contenedorCarrito.append(div)
    }
    const total = array.reduce((acumulado, producto) => acumulado + producto.precio, 0)
    document.getElementById("total").textContent = `Total: $${total}`
}

// evento click: vacía el pedido
const botonVaciar = document.getElementById("vaciar-carrito")
botonVaciar.addEventListener("click", () => {
    carrito.length = 0
    imprimirCarrito(carrito)
})

// evento submit

const formAgregarProducto = document.getElementById("form-agregar-producto")
formAgregarProducto.addEventListener("submit", (event) => {
    event.preventDefault() // evita que se actualice la pagina cuando apretas el boton

    const nombre = document.getElementById("input-nombre").value
    console.log(nombre)

    const precio = document.getElementById("input-precio").value
    console.log(precio)

    formAgregarProducto.reset()
})

// buscador donde el usuario puede escribir

const inputBusqueda = document.querySelector("#input-busqueda")
const formBusqueda = document.getElementById("form-busqueda")

function buscarAlimentos() {
    const busqueda = inputBusqueda.value.toLowerCase()
    const alimentosFiltrados = alimentos.filter((alimento) => alimento.nombre.toLowerCase().includes(busqueda))
    imprimirAlimentosEnHTML(alimentosFiltrados)
}

// evento de teclado: filtra mientras el usuario escribe
inputBusqueda.addEventListener("keyup", buscarAlimentos)

// evento submit: al apretar el botón Buscar o la tecla Enter
formBusqueda.onsubmit = (evento) => {
    evento.preventDefault()
    buscarAlimentos()
}

imprimirAlimentosEnHTML(alimentos)