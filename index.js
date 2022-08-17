const myInput = document.querySelector('#quantityA')
function stepper(btn) {
  let id = btn.getAttribute("id")
  let min = myInput.getAttribute("min")
  let max = myInput.getAttribute("max")
  let value = myInput.getAttribute("value")
  let step = myInput.getAttribute("step") 
  let calstep = (id == "increment") ? (step * 1):(step * -1)
  let newvalue = parseInt(value)+calstep
  if (newvalue >= min && newvalue <= max){
    myInput.setAttribute("value", newvalue)
  }
}


const myInput2 = document.querySelector('#quantityb')
function stepper1(btn) {
  let id = btn.getAttribute("id")
  let min = myInput2.getAttribute("min")
  let max = myInput2.getAttribute("max")
  let value = myInput2.getAttribute("value")
  let step = myInput2.getAttribute("step") 
  let calstep = (id == "increment") ? (step * 1):(step * -1)
  let newvalue = parseInt(value)+calstep
  if (newvalue >= min && newvalue <= max){
    myInput2.setAttribute("value", newvalue)
  }
}

function Customer(url,enlace) {
    let enlace2 = "/" + enlace
    return url + enlace2
}

const btnSaveChanges = document.querySelector("#saveChanges")
const btnSearch = document.querySelector("#search")
const btnCreate = document.querySelector("#create")
// const tiquet = new Escuchando
// inputs

const inCantCreating = document.querySelector(".cant")
const inSearchCustomer = document.querySelector("#searchCustomer")
const NameCustomer = document.querySelector(".NameCustomer")

// contenedor
const contcustomerFound = document.querySelector(".customerFound")
let date = new Date
let url="./contenedor.html"

let  listaDeUsuario = {}
let contador = 0

 function evento(e) {
    // let customerUrl = Customer(url,NameCustomer.value)
    if (NameCustomer.value === "") {
        alert("por favor ingrese nombre del cliente")
    }else{

        let customerID = {
            "ID":NameCustomer.value,
            "customerUrl" : url,
            "customerCantidad":inCantCreating.value,
            "fecha":date.toLocaleDateString()
        }
        let objeto =JSON.stringify(customerID)

        localStorage.setItem(customerID.ID,objeto)
        
        
        if (!listaDeUsuario.hasOwnProperty(customerID.ID)) {
          listaDeUsuario[customerID.ID] = customerID
        }

        contador+=1
    }

    
    
}
document.addEventListener('DOMContentLoaded',function () {
  localCarga()
})
function localCarga() {
  let almacen = []
if (localStorage.length >0){
  // let parseo = JSON.parse(localStorage.getItem(localStorage.key(0)))
  let htmlEnlace = document.createElement('div')
  contcustomerFound.appendChild(htmlEnlace)
  let arr = []
  for(var i = 0; i < localStorage.length; i++) {              
    let clave = localStorage.key(i);
    let cliente = [JSON.parse(localStorage.getItem(clave))];
    for (const iterator of cliente) {
      let contendedorCards = document.createElement('section')

      let div = `
      <div class="cont">
        <h1 class="identi" id="tomar">${iterator.ID}</h1>
        <h2 class="cantidad">Cantidad de tiqutes: ${iterator.customerCantidad}</h2>
        <button id="PR">click</button>
        <a href="${iterator.customerUrl}" id="">hola</a>
        <h4 class="fecha">${iterator.fecha}</h4>
      </div>`
      contendedorCards.innerHTML = div
      contcustomerFound.append(contendedorCards)

      $("#PR").click(function (e) {
        let elemento = e.target.parentElement.children
        for (const iterator of elemento) {
            
            
            
        }
      })
      
    }

   


}
}}



let data = localStorage.getItem(inSearchCustomer.value)
console.log(data)


      // $(contcustomerFound).html( `<div class='cont'<h1 class='identi' id='tomar'>${iterator.ID}</h1><h2 class='cantida'>Cantidad de tiqutes: ${iterator.customerCantidad}</h2><button id='PR'>click</button><h4 class='fecha'>${iterator.fecha}</h4></div>`)
    // for(const i in cliente){
      
    //   arr.push(cliente[i])

    // }
    // almacen.push(arr)
    // htmlEnlace.innerHTML = `<h1>${clienteID}</h1>
    // <p>${fechaDeElaboracion}, direccion: ${clientUrl}</p>
    // <p>${cant}</p>
    // ` 

    