import React, { useState } from "react";
import { useQuery } from 'urql';
import './App.css'
const FILMS_QUERY = `
{
  
  mediosPagoCollection{
    items{
      idMedioPago
      nombreMedioPago
      urlMedioPago
    }
  }
  
  loginCi(id: "2HhXRnNZAvuTyPSXPXg2BC") {logo { url  }  }
}
`;

var total=0
var ItemsCarrito=[]
var Itemstable ={}
var itemDetalle=[]

if (JSON.parse(localStorage.getItem("ItemsCarrito"))!==null) {
  ItemsCarrito=(JSON.parse(localStorage.getItem("ItemsCarrito")));
  Itemstable = JSON.stringify(ItemsCarrito);
}


function eliminarCarrito(){

}

function Carrito(){
  var itemx=null

  return(
  <div>
    <table className="table table-dark">
      <tr>
        <td>Producto</td>
        <td>Cantidad</td>
        <td>Valor</td>
      </tr>
      
      {ItemsCarrito.map((itemc) => (   
        <tbody>
        
        <tr className="FilaOculta">{ itemx= (itemc.split(',')) }</tr>
        
        <tr>  
          <td>{itemx[1]}</td>
          <td>{itemx[3].replace(']', '')}</td>
          <td>$ {parseInt(itemx[2], 10)}</td>
          
        </tr>
        <tr className="FilaOculta">{ total=(total+parseInt(itemx[2], 10)) }</tr>
        </tbody> 
      ))}
    
      
    </table>
    <br></br>
    <h3>El total es ${total}</h3>
  </div>
)
}

function handleClick(idProducto, producto,costo,cantidad) {
  var arreglo=`[${idProducto},${producto},${costo},${cantidad}]`
ItemsCarrito.push(arreglo)
localStorage.setItem("ItemsCarrito", JSON.stringify(ItemsCarrito))
  //alert(ItemsCarrito)
  window.location.href = window.location.href
}





function AlmacenarIDitem(idContentfulProducto) {
  var arreglo=`[${idContentfulProducto}]`
  itemDetalle=arreglo
  localStorage.setItem("itemDetalle", JSON.stringify(itemDetalle))
  window.location.href ="./detalleProducto"
}

function VaciarCarrito(){
  var arreglo=[]
  localStorage.setItem("ItemsCarrito", JSON.stringify(arreglo))
  window.location.href = window.location.href
  
}

function redirigirComprar(){
  window.location.href ="./Comprar"
}

function ShowSelected()
{
/* Para obtener el valor */
console.log(document.getElementById("medioPago").value)
var cod = document.getElementById("medioPago").value;
/* Para obtener el texto */
var combo = document.getElementById("medioPago");
var nombre =document.getElementById("NOMBRE").value
var Email= document.getElementById("EMAIL").value
var Contacto = document.getElementById("CONTANTO").value

alert("Buen Dia "+nombre+"\n"+"Actualmente se redirigira al medio de pago selcionado\n"+"para finiquitar su compra por un valor de $"+total);

return (
  <div id="contenedor" className="contenedor">
    <h5>Gracias por su compra</h5><br></br>
    <h4>{nombre}</h4><br></br>
    <h4>${total}</h4><br></br>

  </div>
)
}


function retornarMarcketPlace(){
  window.location.href ="./marketplace"
}

export default function App() {
  const [result] = useQuery({
    query: FILMS_QUERY,
  });

  const { data, fetching, error } = result;

  if (fetching) return <h1>"Loading..."</h1>;
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
        <header id="header" className="cabeza">
        <h1>Clinica Imperial</h1> 
        <img class="carrito" src={data.loginCi.logo.url} alt="logo"></img>
        </header>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <h4 className="TituloPedido">Pedido</h4>
          </div>
          <div className="row">
<Carrito></Carrito>
          </div>
          <br></br>
          <div className="row">
            <button className="btn btn-danger btn-lg btn-block" onClick={() => VaciarCarrito()}>Eliminar Compra</button><br></br>
            <button  className="btn btn-info  btn-lg btn-block" onClick={() => retornarMarcketPlace()} >Retornar al Marketplace</button>
          </div>
        </div>
       <div className="col-md-8">
        <div id="contenedor" className="contenedor">
<div><form>
<div className="card text-center mb-6">
  <div className="card-header">
    <h4>Compra</h4>
  </div>
  <div className="card-body">
    <h4 className="card-title">Formulario De Compra</h4>
    <h4>Nombre Completo</h4>
    <p className="card-text"><input type="text" className="form-control" id ="NOMBRE"></input></p>
    <h4>Telefono de Contacto</h4>
    <p className="card-text"><input type="number" className="form-control" id="CONTACTO"></input></p>
    <h4>Correo Electronico</h4>
    <p className="card-text"><input type="email" className="form-control" id="EMAIL"></input></p>
    <h4>Direccion</h4>
    <p className="card-text"><input type="text" className="form-control"id ="DIRECCION"></input></p>
    <h4>Medio de pago</h4>
    <p className="card-text">
    <select name="medioPago" id="medioPago" className="form-control">
      {console.log(data.mediosPagoCollection.items)}
      {data.mediosPagoCollection.items.map((item) => (
        
      <option value={item.idMedioPago} key={item.urlMedioPago}>{item.nombreMedioPago}</option>
      
      ))}
     </select>
     </p>


    <button  className="btn btn-primary" onClick={ShowSelected} >Finalizar Compra</button>
    
  </div>
  <div className="card-footer text-muted">
    Gracias por Confiar en Nosotros
  </div>
</div>

</form></div>
    </div>
    </div>

    </div>

    </div>
  );
}