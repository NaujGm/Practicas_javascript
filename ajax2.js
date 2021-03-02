//////////* Recibir, leer y mostrar archivo de texto */
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
    return;
}
var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
        };
    lector.readAsText(archivo);
}
// function mostrarContenido(contenido) {
//     var elemento = document.getElementById('contenido-archivo');
//     elemento.innerHTML = contenido;
//     console.log(contenido);
// } 
// document.getElementById('file-input').addEventListener('change', leerArchivo, false);

// console.log();

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
    console.log(contenido);
} 
document.getElementById('file-input').addEventListener('change', leerArchivo, false);

/* Comprobar conexión */
// console.log('correcto');
/////////////////////////////////////* Devolver datos desde bd.json */
/* Botón para la lanzar la función que trae los datos de la bd */
document.querySelector('#boton-json').addEventListener('click', traerDatos());

function traerDatos(){
    /* Comprobar conxión en función */
    // console.log('fx');
    /* Conexión a la bd en json */
    const xhttp = new XMLHttpRequest();

    // var archivo_pre = document.getElementById("files").files[0];
    ///////////////////////////////////////////////////GET.ELEMENT => el subido!
    // xhttp.open('GET', archivo_pre, true);
    xhttp.open('GET','contenido', true);
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
////////////////////////////////////////* Descargar archivo */
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
function generarTexto(datos){
    var texto = [];
    texto.push('[{');
    texto.push('\n');
    texto.push('"Concepto": ');
    texto.push('"'+datos.concepto+'",');
    texto.push('\n');
    texto.push('"Valor": ');
    texto.push('"'+datos.valor+'",');
    texto.push('\n');
    texto.push('"Seguridad": ');
    texto.push('"'+datos.seguridad+'",');
    texto.push('\n');
    texto.push('"Fecha": ');
    texto.push('"'+datos.fecha+'"');
    texto.push('\n');
    texto.push('}]');
//El constructor de Blob requiere un Array en el primer
//parámetro así que no es necesario usar toString. El
//segundo parámetro es el tipo MIME del archivo
return new Blob(texto, {
    type: 'text/plain'
    });
};
document.getElementById('btnSend').addEventListener('click', function () {
var datos = obtenerDatos();
/////////////////////////////////////////////////////////////////TIPO DE ARCHIVO
descargarArchivo(generarTexto(datos), 'archivo.txt');
////////////////////////////////////////////////////////////////////////////////
}, false);
////////////////////////////////////////* Subir archivos a la plataforma */
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
}
/* _ */
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

