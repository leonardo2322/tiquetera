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

// inputs

const inCantCreating = document.querySelector(".cant")
const inSearchCustomer = document.querySelector("#searchCustomer")
const NameCustomer = document.querySelector(".NameCustomer")

// contenedor
const contcustomerFound = document.querySelector(".customerFound")
let date = new Date
let url="http://127.0.0.1:5500/index.html"


function evento(e) {
    let customerUrl = Customer(url,NameCustomer.value)
    console.log(customerUrl)
    let customerCreated;
    if (NameCustomer.value === "") {
        alert("por favor ingrese nombre del cliente")
    }else{
        let customerID = {
            "ID":NameCustomer.value,
            "customerUrl" : customerUrl,
            "customerCantidad":inCantCreating.value,
            "fecha":date.toLocaleDateString()
        }
        let objeto =JSON.stringify(customerID)

        localStorage.setItem(customerID.ID,objeto)

        console.log(JSON.parse(localStorage.getItem(customerID.ID)))
    }
}

