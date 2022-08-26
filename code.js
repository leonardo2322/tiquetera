document.addEventListener('DOMContentLoaded',function () {
    const inp = document.getElementById('inp')
    const cantida = document.getElementById('numero')
    const fechaini = document.getElementById('fecha')
    let re = /^[\-]/
    let almacen = []

    const indexDb = window.indexedDB;
    if (indexDb) {
        let db;
        const request = indexDb.open("clientes", 1);
    
        request.onsuccess = (evento) => {
          // todo ha hido bien
          db = request.result;
          console.log("satisfactoriament", db);
        //   getData("1")
        readData()

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
        function getData(key) {
            const transaction = db.transaction(["ListCustomer"], "readonly");
            const objectStore = transaction.objectStore("ListCustomer");
            const reques = objectStore.get();

            reques.onsuccess = (e) => {
            //   cantida.textContent += reques.result.clienteID;
            //   inp.textContent = reques.result.cantidad;
            };
            reques.onerror = (e) => {
              alert(e);
            };
          }
          function readData() {
            const transaction = db.transaction(["ListCustomer"], "readonly");
            const objectStore = transaction.objectStore("ListCustomer");
            const reques = objectStore.openCursor();

            reques.onsuccess= (e)=>{
                var cursor = e.target.result
                if(cursor ===null){
                    return
                }
                if (cursor) {
                    almacen.push(cursor.value)
                    cursor.continue()
                    
                }
                
            }
            transaction.oncomplete =function (){
              let cliente
                almacen.forEach(el =>{
                    if(re.test(el.clienteID)){

                        inp.textContent = el.clienteID.replace("-","")
                        cantida.textContent += el.cantidad
                        fechaini.textContent += el.fecha
                        var data = {
                          "name":el.clienteID.replace("-",""),
                          "cant":el.cantidad,
                          "fechaa":el.fecha
                        }
                        cliente = el.clienteID
                        localStorage.setItem(el.clienteID,JSON.stringify(data))
                    }
                    
                    
                })
                if (localStorage.length > 0) {
                  let local = JSON.parse(localStorage.getItem(cliente))
                  inp.textContent = local.name
                  cantida.textContent ="TU Cantidad de tiquetes Es: "+ local.cant
                  fechaini.textContent =local.fechaa
                  console.log(local)
                }
                
            }
            
        }

        
}


  })