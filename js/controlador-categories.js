var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

function llenarTablaCategories() {
  axios({
    url: "http://localhost/Backend-portalBD/api/categorias.php",
    method: "get",
    responseType: "json",
  }).then((res) => {
      document.getElementById("bodycategories").innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        document.getElementById("bodycategories").innerHTML += `
            <tr>
                <td>${res.data[i].id}</td>
                <td><img src="${res.data[i].icono}" alt="" height="30px"></td>
                <td>${res.data[i].nombreCategoria}</td>
                <td>
                    <a class="btn btn-info" href="../html/editarCategoria.html" onclick="categoriaSeleccionada(${i})">
                        <i class="fas fa-pen"></i>
                    </a>
                    <button class="btn btn-danger" onclick="eliminarCategoria(${i})">
                        <i class="fas fa-trash-alt"></i>
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
llenarTablaCategories();

function categoriaSeleccionada(idCategoria) {
  axios({
    url:
      "http://localhost/Backend-portalBD/api/categorias.php?id=" + idCategoria,
    method: "get",
    responseType: "json",
  })
    .then((res) => {
      sessionStorage.setItem(
        "Categoria Seleccionada",
        JSON.stringify(res.data)
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

function eliminarCategoria(idCategoria) {
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
          "http://localhost/Backend-portalBD/api/categorias.php?id=" +
          idCategoria,
        method: "delete",
        responseType: "json",
      })
        .then((res) => {
          llenarTablaCategories();

          Swal.fire({
            icon: "success",
            title: "Eliminada!",
            text: "La categoria ha sido eliminada",
            confirmButtonColor: "#4c4175",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
