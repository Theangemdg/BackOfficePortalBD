var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;
var categoriaActiva = JSON.parse(
  sessionStorage.getItem("Categoria Seleccionada")
);

function llenarTablaProductos() {
  axios({
    url:
      "http://localhost/Backend-portalBD/api/productos.php?id=" +
      (categoriaActiva.id - 1),
    method: "get",
    responseType: "json",
  })
    .then((res) => {
      console.log(res.data);
      document.getElementById("bodyproductos").innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        document.getElementById("bodyproductos").innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td><img src="${
                  res.data[i].imgProducto
                }" alt="" height="30px"></td>
                <td>${res.data[i].nombreProducto}</td>
                <td>$${res.data[i].precio}</td>
                <td>
                    <a class="btn btn-info" href="../html/editarProducto.html" onclick="productoSeleccionado('${i}')">
                        <i class="fas fa-pen"></i>
                    </a>
                    <button class="btn btn-danger" onclick="eliminarProducto('${i}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#modalReceta"
                    >
                      Receta
                    </button>
                </td>
            </tr>
            `;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
llenarTablaProductos();

function productoSeleccionado(idproducto) {
  console.log(idproducto);
  axios({
    url:
      "http://localhost/Backend-portalBD/api/productos.php?id=" +
      (categoriaActiva.id - 1) +
      "&idP=" +
      idproducto,
    method: "get",
    responseType: "json",
  })
    .then((res) => {
      console.log(res);
      sessionStorage.setItem("producto seleccionado", JSON.stringify(res.data));
      sessionStorage.setItem("idProducto", idproducto);
    })
    .catch((err) => {
      console.log(err);
    });
}

function eliminarProducto(idproducto) {
  console.log(idproducto);

  Swal.fire({
    title: "Estas Seguro?",
    text: "No podras revertir los cambios",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4c4175",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url:
          "http://localhost/Backend-portalBD/api/productos.php?id=" +
          (categoriaActiva.id - 1) +
          "&idP=" +
          idproducto,
        method: "delete",
        responseType: "json",
      })
        .then((res) => {
          llenarTablaEmpresas();

          Swal.fire({
            icon: "success",
            title: "Eliminada!",
            text: "El producto ha sido eliminada",
            confirmButtonColor: "#4c4175",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
