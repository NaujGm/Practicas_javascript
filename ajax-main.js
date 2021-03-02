/* Comprobar conexión */
// console.log('correcto');
/* Botón para la lanzar la función que trae los datos de la bd */
document.querySelector('#boton-json').addEventListener('click', traerDatos);

function traerDatos(){
    /* Comprobar conxión en función */
    // console.log('fx');
    /* Conexión a la bd en json */
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'base-1.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        /* Leer datos de la bd en json */
        if(this.readyState == 4 && this.status == 200){
            /* Comprobar conxión con datos .json */
            // console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            /* Comprobar conxión transformación parse */
            // console.log(datos);
            /* Seleccionar contenedor de salida */
            let resp = document.querySelector('#respuesta');
            /* Poner a 0 la tabla a pintar */
            resp.innerHTML = '';
            /* Bucle para escupir los datos */
            for(let item of datos){
                /* Comprobar que el for se hará sobre el array de datos */
                // console.log(item);
                /* Comprobar que se puede coger valor dentro de la etiqueta */
                // console.log(item.Nombre);
                /* Pintar datos en una tabla desde json */
                resp.innerHTML += ` 
                <tr>
                    <td>${item.Concepto}</td>
                    <td>${item.Valor}</td>
                    <td>${item.Seguridad}</td>
                </tr>
                ` //Ojo con la comilla extraña esta! Se abre después del += para poder usar vars
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", function(e) {
    
    var miForm = document.getElementById('input-data');
    miForm.onsubmit = function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var jsonData = {};
      for (var [k, v] of formData) {
        jsonData[k] = v;
      }
      console.log(jsonData);
    }
  });