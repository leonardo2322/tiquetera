const myInput = document.querySelector('#quantityA')

const btnSaveChanges = document.querySelector("#saveChanges")
const btnSearch = document.querySelector("#search")
const btnCreate = document.querySelector("#create")
// const tiquet = new Escuchando
// inputs

const inCantCreating = document.querySelector(".cant")
const inSearchCustomer = document.querySelector("#searchCustomer")
const NameCustomer = document.querySelector(".NameCustomer")
const cantr = document.getElementById("cantR").value

// contenedor
const contcustomerFound = document.querySelector(".customerFound")
let date = new Date
let url="./contenedor.html"

let  listaDeUsuario = {}
let contador = 0

inSearchCustomer.value = ""


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





 function evento(e) {
    // let customerUrl = Customer(url,NameCustomer.value)
    if (NameCustomer.value === "") {
        alert("por favor ingrese nombre del cliente")
    }else{

        let customerID = {
            "ID":NameCustomer.value,
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
let dato =/[0-9]/
let segundaB = /^[0-9]/
function localCarga() {
  let almacen = []
if (localStorage.length >0){
  // let parseo = JSON.parse(localStorage.getItem(localStorage.key(0)))
  let htmlEnlace = document.createElement('div')
  contcustomerFound.appendChild(htmlEnlace)
  let arr = []
  for(let i = 0; i < localStorage.length; i++) { 

    let clave = localStorage.key(i);
    
      let cliente = [JSON.parse(localStorage.getItem(clave))];
      for (const iterator of cliente) {
        let contendedorCards = document.createElement('section')
        

        if (segundaB.test(iterator.ID)){
          localStorage.removeItem(iterator.ID)
        }
        else if (segundaB.test(clave)){
          localStorage.removeItem(clave)
        }
        else{        let div = `
        <div class="cont" id="cont">
          <h1 class="identi" id="tomar">${iterator.ID}</h1>
          <h2 class="cantidad" id="cantidad">Cantidad de tiqutes: ${iterator.customerCantidad}</h2>
          <button class="click" id="PR">click</button>
          <a href="${url}" id="">hola</a>
          <h4 class="fecha">${iterator.fecha}</h4>
        </div>`
        contendedorCards.innerHTML = div
        contcustomerFound.append(contendedorCards)
  
        $(".cont").click(function (e) {
          let elemento = e.target.parentElement.children
          console.log(e.target.getAttribute('id'))
          if (e.target.getAttribute('id')=="PR"){
            let nombre = elemento[0].textContent
            let cant = elemento[1].textContent.match(dato)
            console.log(nombre,cant)
            let ide ="1"+ nombre
            localStorage.setItem(ide,cant)
          }
          
        })
}

      }

  
        
  
    } 

}
}

let regu = /[\-0-9]/ 

let r =  /[0-9]/
btnSearch.addEventListener('click',()=>{
  let Nombre =inSearchCustomer
  if (Nombre.value.length > 0) {
    let valor = JSON.parse(localStorage.getItem(Nombre.value))
    let cantidad = Number(cantr)


    if (regu.test(cantidad)) {
      cantidad = String(cantidad).replace("-","")
      cantidad = Number(cantidad)
      let nuevoValor =valor.customerCantidad-cantidad 
      console.log(nuevoValor)
      
    
    }
    else if (cantr == undefined || cantr ==null){
      alert('no introdujiste un numero')
    }
    else if ( typeof(cantidad)==='number' && r.test(cantidad)){
      alert('entramos en la suma')
    }else{
      console.log('en ninguno')
    }
  }else{
    alert("No has introducido datos para buscar")
  }
  
})




