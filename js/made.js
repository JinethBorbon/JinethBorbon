
let productos_tienda = [   // variable tipo array
    { id: 1, nombre: "papas", categorias: "snaks", precio: 2000, proveedor: "Margarita", imagen: "https://m.media-amazon.com/images/I/81TLFU5Yj6L._SL1500_.jpg" },
    { id: 2, nombre: "chocorramo", categorias: "ponque", precio: 1500, proveedor: "Ramo", imagen: "https://elviejoparisvirtual.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd0tUSWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4204f2765b8e61a59d58f9a32b92a48da2b998ef/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9TY21WemFYcGxYM1J2WDJacGRGc0hhUUlnQTJrQ0lBTTZER052Ym5abGNuUkpJZ2hxY0djR09nWkZWRG9LYzJGMlpYSjdDRG9NY1hWaGJHbDBlV2xmT2dwemRISnBjRlE2RDJKaFkydG5jbTkxYm1SYkNHa0IvMmtCLzJrQi93PT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--f9b6205701877dad933126b17f2a1a57fbbba520/7702914114400.jpg?locale=es" },
    { id: 3, nombre: "salsa", categorias: "snaks", precio: 3000, proveedor: "Margarita", imagen: "https://www.cocinayvino.com/wp-content/uploads/2017/09/salsa-ta%CC%81rtara.jpg" },
    { id: 4, nombre: "gaseosa", categorias: "bebidas", precio: 2500, proveedor: "cocacola", imagen: "https://elrancherito.com.co/wp-content/uploads/2020/06/Gaseosa.png" },
    { id: 5, nombre: "dulces", categorias: "caramelo", precio: 1000, proveedor: "colombina", imagen: "https://media.istockphoto.com/vectors/sweets-and-candy-pictures-objects-from-sugar-dulce-caramel-candy-and-vector-id1026540804?s=612x612" },
    { id: 6, nombre: "alitas", categorias: "carne", precio: 10000, proveedor: "pollos", imagen: "https://cdn.colombia.com/gastronomia/2011/07/25/alitas-a-la-naranja-1478.webp" }
]

function formatoDecimal(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
let contenedor_productos = document.getElementById("mis_productos")
// for of: algo que va a iterar entre algun elemento especifico, permite hacer el recorrido de un array

for (const iteracion of productos_tienda) {  // recorreo el contenedor_productos
    contenedor_productos.innerHTML += `
    <div class="col">
        <div class="card">
            <img src="${iteracion.imagen}" class=" img_producto concard-img-top" alt="...">
        <div class="ccard-body d-flex justify-content-center align-items-center flex-column">
            <h5 class="card-title">${iteracion.nombre}</h5>
            <h6> ${formatoDecimal(iteracion.precio)}</h6>
            <p class="card-text">${iteracion.proveedor}</p> 
            <button type="button" class="btn btn-dark" 
            onclick="agregar_producto_carrito('${iteracion.nombre}', ${iteracion.precio})">Agregar al carrito </button>  <!--dispara funcion para alimenta el array-->

        </div>
    </div>
    `
}


class carritoCompras {
    constructor() {
        this.productos = [ ] 
    }
    nuevo_producto(producto_nuevo) { 
        this.productos.push(producto_nuevo)  
        return this.productos
    }
    precio_total() { 
        let total_cuenta = 0
        //let lista_precio = ''  
        this.productos.forEach(function (data_producto) {  
            
            total_cuenta = parseInt(total_cuenta) + parseInt(data_producto.precio) 
        });
        return total_cuenta 

    }

} 
let compras = new carritoCompras() 
 
function crear_tabla(contador_actual = 1, actualizar_tabla = false){

    let llenar_tabla = document.getElementById("datos_tabla")
    let llenar_total_tabla = document.getElementById("datos_total_tabla")

    llenar_tabla.innerHTML =''
    llenar_total_tabla.innerHTML =''

    
        let contador_futuro = localStorage.getItem('contador')
        for( let id_dato = 1; id_dato < contador_futuro; id_dato ++){
            if(localStorage.getItem('nombre_'+id_dato) != null && localStorage.getItem('precio_'+id_dato)!= null){

                llenar_tabla.innerHTML += `
                <tr>
                    <td>${localStorage.getItem('nombre_'+id_dato)}</td>
                    <td>${localStorage.getItem('precio_'+id_dato)}</td>
                    <td>
                        <i class="fas fa-trash mx-2" onclick="borrar_elemento(${id_dato})"></i>
                    </td>
                </tr>
                `
                llenar_total_tabla.innerHTML =`
                <tr>
                    <td colspan="2">Suma Total</td>
                    <td>${compras.precio_total()}</td>
                </tr>
                `

            }else if(localStorage.getItem('nombre_'+contador_actual)  != null){
               
                llenar_tabla.innerHTML += `
                <tr>
                    <td>${localStorage.getItem('nombre_'+contador_actual)}</td>
                    <td>${localStorage.getItem('precio_'+contador_actual)}</td>
                    <td>
                        <i class="fas fa-trash mx-2" onclick="borrar_elemento(${contador_actual})"></i>
                    </td>
                </tr>
                `
                llenar_total_tabla.innerHTML =`
                <tr>
                    <td colspan="2">Suma Total</td>
                    <td>${compras.precio_total()}</td>
                </tr>
                `            
            }
    }
}

function agregar_producto_carrito(Datos_nombre, datos_precio, accion){

    let compra_prod = {
        nombre: Datos_nombre,
        precio: datos_precio    
    }
    let acciones = accion
    compras.nuevo_producto(compra_prod) 
    console.log(compra_prod)
    compras.precio_total()
    console.log(compras.precio_total())

    /*
    console.log( localStorage.getItem('Sum_valor'))
    if (localStorage.getItem('Sum_valor') == null){
        var valor_prod = 0             
    } else{
        var valor_prod = localStorage.getItem('Sum_valor')
   }
    let valor_total = document.getElementById('precio_total_compra')
    valor_prod = parseInt(valor_prod) + parseInt(compra_prod.precio)
    localStorage.setItem('Sum_valor', valor_prod) 
    valor_total.innerHTML = valor_prod
    
    let valor_total = document.getElementById('precio_total_compra')
    valor_total.innerHTML = compras.precio_total()
    */
    let contador_id = 1

    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_id)
    } else {
        contador_id = localStorage.getItem("contador")
    }
       
    localStorage.setItem("nombre_" +  contador_id , compra_prod.nombre )
    localStorage.setItem("precio_" +  contador_id , compra_prod.precio )
    contador_id = parseInt(contador_id) + 1
    localStorage.setItem("contador", contador_id)
    localStorage.setItem("suma_total",compras.precio_total() )

    crear_tabla(1,true)

}

function borrar_elemento (id_dato){
   
    localStorage.removeItem("nombre_" + id_dato)
    localStorage.removeItem("precio_" + id_dato)
  
   crear_tabla(1,true)
}
