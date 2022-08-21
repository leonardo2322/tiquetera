const myInput = document.querySelector("#quantityA");

const btnSaveChanges = document.querySelector("#saveChanges");
const btnSearch = document.querySelector("#search");
const btnCreate = document.querySelector("#create");

const inCantCreating = document.querySelector(".cant");
const inSearchCustomer = document.querySelector("#searchCustomer");
const NameCustomer = document.querySelector(".NameCustomer");
let cantr = document.getElementById("cantR");

const contcustomerFound = document.querySelector(".customerFound");
let date = new Date();
let url = "./contenedor.html";

let listaDeUsuario = {};
let contador = 0;

inSearchCustomer.value = "";

function stepper(btn) {
  let id = btn.getAttribute("id");
  let min = myInput.getAttribute("min");
  let max = myInput.getAttribute("max");
  let value = myInput.getAttribute("value");
  let step = myInput.getAttribute("step");
  let calstep = id == "increment" ? step * 1 : step * -1;
  let newvalue = parseInt(value) + calstep;
  if (newvalue >= min && newvalue <= max) {
    myInput.setAttribute("value", newvalue);
  }
}

const myInput2 = document.querySelector("#quantityb");
function stepper1(btn) {
  let id = btn.getAttribute("id");
  let min = myInput2.getAttribute("min");
  let max = myInput2.getAttribute("max");
  let value = myInput2.getAttribute("value");
  let step = myInput2.getAttribute("step");
  let calstep = id == "increment" ? step * 1 : step * -1;
  let newvalue = parseInt(value) + calstep;
  if (newvalue >= min && newvalue <= max) {
    myInput2.setAttribute("value", newvalue);
  }
}
const btnbusqueda = document.getElementById("searchUser")
const inpBusqueda = document.getElementById('inpBusqueda')

document.addEventListener("DOMContentLoaded", function () {
  const indexDb = window.indexedDB;

  if (indexDb) {
    let db;
    const request = indexDb.open("clientes", 1);

    request.onsuccess = (evento) => {
      // todo ha hido bien
      db = request.result;
      console.log("satisfactoriament", db);
      readData();
    };
    request.onerror = (evento) => {
      // ocurrio un errror en la base de datos
      console.log("error", evento);
    };
    request.onupgradeneeded = (event) => {
      // si necesita actualizar
      db = request.result;
      console.log("actualizado se creo correcto", db);
      const objectStore = db.createObjectStore("ListCustomer", {
        keyPath: "clienteID",
      });
    };
    const upgradeData = (data) => {
      const transaction = db.transaction(["ListCustomer"], "readwrite");
      const objectStore = transaction.objectStore("ListCustomer");
      const reques = objectStore.put(data);
      readData();
    };

    const addData = (data) => {
      const transaction = db.transaction(["ListCustomer"], "readwrite");
      const objectStore = transaction.objectStore("ListCustomer");
      const reques = objectStore.add(data);
      readData();
    };
    var readData = () => {
      const transaction = db.transaction(["ListCustomer"], "readonly");
      const objectStore = transaction.objectStore("ListCustomer");
      const reques = objectStore.openCursor();
      const fragment = document.createDocumentFragment();

      reques.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const title = document.createElement("h1");
          title.textContent = "Cliente: " + cursor.value.clienteID;
          fragment.appendChild(title);

          const cantida = document.createElement("h3");
          cantida.textContent = "cantidad De Tiquets: " + cursor.value.cantidad;
          fragment.appendChild(cantida);

          const fech = document.createElement("h4");
          fech.textContent = "fecha: " + cursor.value.fecha;
          fech.style.borderBottom = "2px solid #000";
          fech.style.marginBottom = "1rem";
          fragment.appendChild(fech);

          const buttonDelete = document.createElement("button");
          buttonDelete.id = "btnEliminar";
          buttonDelete.textContent = "Delete";
          fragment.appendChild(buttonDelete);

          cursor.continue();
        } else {
          console.log("no more data");
          contcustomerFound.textContent = "";
          contcustomerFound.appendChild(fragment);
        }
      };
    };
    btnCreate.addEventListener("click", function () {
      console.log("aqui");
      const data = {
        clienteID: NameCustomer.value,
        cantidad: inCantCreating.value,
        fecha: date.toLocaleDateString(),
      };

      console.log(NameCustomer.value, inCantCreating.value);
      addData(data);
    });
    let regu = /^[\-]/;
    function getData(key) { 
      const transaction = db.transaction(["ListCustomer"], "readwrite");
      const objectStore = transaction.objectStore("ListCustomer");
      const reques = objectStore.get(key);

      reques.onsuccess = (e)=>{
        inSearchCustomer.value = reques.result.clienteID
        cantr.value = reques.result.cantidad
        console.log(typeof(reques.result.cantidad))
      }
     } 

    btnbusqueda.addEventListener('click',()=>{
      getData(inpBusqueda.value)
     })
    let r = /[0-9]/;
    btnSearch.addEventListener("click", () => {
      let Nombre = inSearchCustomer;
      if (Nombre.value.length > 0) {
        let cantidad = Number(cantr);
        
      } else {
        alert("No has introducido datos para buscar");
      }
    });
  }
});

//  function evento(e) {
//     // let customerUrl = Customer(url,NameCustomer.value)
//     if (NameCustomer.value === "") {
//         alert("por favor ingrese nombre del cliente")
//     }else{

//         let customerID = {
//             "ID":NameCustomer.value,
//             "customerCantidad":inCantCreating.value,
//             "fecha":date.toLocaleDateString()
//         }
//         let objeto =JSON.stringify(customerID)

//         localStorage.setItem(customerID.ID,objeto)

//         if (!listaDeUsuario.hasOwnProperty(customerID.ID)) {
//           listaDeUsuario[customerID.ID] = customerID
//         }

//         contador+=1
//     }

// }
// document.addEventListener('DOMContentLoaded',function () {
//   localCarga()
// })
// let dato =/[0-9]/
// let segundaB = /^[0-9]/
// function localCarga() {
//   let almacen = []
// if (localStorage.length >0){
//   // let parseo = JSON.parse(localStorage.getItem(localStorage.key(0)))
//   let htmlEnlace = document.createElement('div')
//   contcustomerFound.appendChild(htmlEnlace)
//   let arr = []
//   for(let i = 0; i < localStorage.length; i++) {

//     let clave = localStorage.key(i);

//       let cliente = [JSON.parse(localStorage.getItem(clave))];
//       console.log(cliente)
//       for (const iterator of cliente) {
//         let contendedorCards = document.createElement('section')

//         if (segundaB.test(iterator.ID)){
//           localStorage.removeItem(iterator.ID)
//         }
//         else if (segundaB.test(clave)){
//           localStorage.removeItem(clave)
//         }
//         else{        let div = `
//         <div class="cont" id="cont">
//           <h1 class="identi" id="tomar">${iterator.ID}</h1>
//           <h2 class="cantidad" id="cantidad">Cantidad de tiqutes: ${iterator.customerCantidad}</h2>
//           <button class="click" id="PR">click</button>
//           <a href="${url}" id="">hola</a>
//           <h4 class="fecha">${iterator.fecha}</h4>
//         </div>`
//         contendedorCards.innerHTML = div
//         contcustomerFound.append(contendedorCards)

//         $(".cont").click(function (e) {
//           let elemento = e.target.parentElement.children
//           console.log(e.target.getAttribute('id'))
//           if (e.target.getAttribute('id')=="PR"){
//             let nombre = elemento[0].textContent
//             let cant = elemento[1].textContent.match(dato)
//             console.log(nombre,cant)
//             let ide ="1"+ nombre
//             localStorage.setItem(ide,cant)
//           }

//         })
// }

//       }

//     }

// }
// }
