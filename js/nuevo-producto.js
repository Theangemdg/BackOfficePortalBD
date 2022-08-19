var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;
var categoriaActiva = JSON.parse(
  sessionStorage.getItem("Categoria Seleccionada")
);

function guardarProducto() {
  let txtnombreProducto = document.getElementById("nombre").value;
  let txtimagen = document.getElementById("imagen").value;
  let txtprecio = document.getElementById("precio").value;
  let txtdescripcion = document.getElementById("descripcion").value;

  if (txtnombreProducto && txtimagen && txtprecio && txtdescripcion) {
    axios({
      url: "http://localhost/Backend-portalBD/api/productos.php",
      method: "get",
      responseType: "json",
    }).then((res) => {
      let producto = {
        id_producto: parseInt(res.data.ultimo_value) + 1,
        nombre: txtnombreProducto,
        descripcion: txtdescripcion,
        id_categoria: categoriaActiva.id_categoria,
        precio: parseInt(txtprecio),
        imagen: txtimagen,
        estado: 1,
      };
      axios({
        url: "http://localhost/Backend-portalBD/api/productos.php",
        method: "post",
        responseType: "json",
        data: producto,
      })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Agregado!",
            text: "se ha agregado el producto correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          limpiarInputs();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "debes rellenar todos los campos",
      confirmButtonColor: "#4c4175",
    });
  }
}

function limpiarInputs() {
  document.getElementById("nombre").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("descripcion").value = "";
}
