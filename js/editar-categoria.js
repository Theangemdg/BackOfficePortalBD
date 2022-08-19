var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

var categoriaActiva = JSON.parse(
  sessionStorage.getItem("Categoria Seleccionada")
);
console.log(categoriaActiva);
document.getElementById("nombre").value = categoriaActiva.nombreCategoria;
document.getElementById("descripcion").value = categoriaActiva.icono;

axios({
  url:
    "http://localhost/Backend-portalBD/api/productos.php?id=" +
    categoriaActiva.id_categoria,
  method: "get",
  responseType: "json",
})
  .then((res) => {
    console.log(res.data);
    document.getElementById("producto").innerHTML = "";
    for (let i = 0; i < res.data.length; i++) {
      document.getElementById(
        "producto"
      ).innerHTML += `<option value="${i}">${res.data[i].nombre}</option>
        `;
    }
  })
  .catch((err) => {
    console.log(err);
  });

function editarCategoria() {
  let txtnombreCategoria = document.getElementById("nombre").value;
  let txticono = document.getElementById("descripcion").value;

  if (txtnombreCategoria && txticono) {
    let categoria = {
      id_categoria: categoriaActiva.id_categoria,
      nombreCategoria: document.getElementById("nombre").value,
      descripcion: categoriaActiva.descripcion,
      cantidad_productos: categoriaActiva.cantidad_productos,
      icono: document.getElementById("descripcion").value,
    };

    axios({
      url:
        "http://localhost/Backend-portalBD/api/categorias.php?id=" +
        categoriaActiva.id_categoria,
      method: "put",
      responseType: "json",
      data: categoria,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Swal.fire({
      icon: "success",
      title: "Agregado!",
      text: "se ha actualizado la categoria correctamente",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      window.location = "../html/adminCategories.html";
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


