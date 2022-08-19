$(document).ready(function () {
//     $("#Cont-P").html(`<div class="tiket">
//     <h1>
//         Tiquet Delicias de Ama
//     </h1>
//         <img src="./img/imgimg_restaurante.png" alt="">
//         <input type="text" class="NameCustomer" id="inp" value=``>
//         <h1>Nº</h1>
//         <input  type="number" name="cant" class="cant" id="quantityA" min="0" max="60" value="1" step="1" readonly>
// </div>`);
    let search = /^[0-9]/
    const Cantidad = document.getElementById("cant")
    const nombre = document.getElementById("inp")

    for (let index = 0; index < localStorage.length; index++) {
        const element = localStorage.key(index);
        let data = JSON.parse(localStorage.getItem(element))
        // console.log(Object.values(localStorage.key(element)))
        if (search.test(element) && typeof(data)==='number'){
            let nuevoEl = element.replace("1","")
            Cantidad.value = data
            nombre.textContent = nuevoEl


        }
    }
;
});
