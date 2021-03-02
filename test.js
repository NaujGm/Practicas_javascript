function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    //creamos un FileReader para leer el Blob
    var reader = new FileReader();
    //Definimos la función que manejará el archivo
    //una vez haya terminado de leerlo
    reader.onload = function (event) {
      //Usaremos un link para iniciar la descarga
      var save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      //Truco: así le damos el nombre al archivo
      save.download = nombreArchivo || 'archivo.dat';
      var clicEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      //Simulamos un clic del usuario
      //no es necesario agregar el link al DOM.
      save.dispatchEvent(clicEvent);
      //Y liberamos recursos...
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    //Leemos el blob y esperamos a que dispare el evento "load"
    reader.readAsDataURL(contenidoEnBlob);
  };
//Función de ayuda: reúne los datos a exportar en un
//solo objeto
function obtenerDatos() {
    return {
      concepto: document.getElementById('concepto').value,
      valor: document.getElementById('valor').value,
      seguridad: document.getElementById('seguridad').value,
      fecha: (new Date()).toLocaleDateString()
    };
  };
   
  //Genera un objeto Blob con los datos en un archivo TXT
  function generarTexto(datos) {
    var texto = [];
    texto.push('Concepto: ');
    texto.push(datos.concepto);
    texto.push('\n');
    texto.push('Valor: ');
    texto.push(datos.valor);
    texto.push('\n');
    texto.push('Seguridad: ');
    texto.push(datos.seguridad);
    texto.push('\n');
    texto.push('Fecha: ');
    texto.push(datos.fecha);
    texto.push('\n');
    //El constructor de Blob requiere un Array en el primer
    //parámetro así que no es necesario usar toString. El
    //segundo parámetro es el tipo MIME del archivo
    return new Blob(texto, {
      type: 'text/plain'
    });
  };
   
  document.getElementById('btnSend').addEventListener('click', function () {
    var datos = obtenerDatos();
    descargarArchivo(generarTexto(datos), 'archivo.txt');
  }, false);



/* Función Buena!! */

  document.querySelector('#boton-json').addEventListener('click', traerDatos);

function traerDatos(){
    /* Comprobar conxión en función */
    // console.log('fx');
    /* Conexión a la bd en json */
    const xhttp = new XMLHttpRequest();

    // var archivo_pre = document.getElementById("files").files[0];
    ///////////////////////////////////////////////////GET.ELEMENT => el subido!
    // xhttp.open('GET', archivo_pre, true);
    xhttp.open('GET', ('base-1.json'), true);
    ////////////////////////////////////////////////////////////////////////////
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
};