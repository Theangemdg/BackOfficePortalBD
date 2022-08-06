var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

var categoriaActiva = JSON.parse(
  sessionStorage.getItem("Categoria Seleccionada")
);
document.getElementById("nombre").value = categoriaActiva.nombreCategoria;
document.getElementById("descripcion").value = categoriaActiva.icono;

axios({
  url:
    "http://localhost/Backend-portalBD/api/categorias.php?id=" +
    (categoriaActiva.id - 1),
  method: "get",
  responseType: "json",
})
  .then((res) => {
    console.log(res);
    document.getElementById("producto").innerHTML = "";
    for (let i = 0; i < res.data.productos.length; i++) {
      document.getElementById(
        "producto"
      ).innerHTML += `<option value="${i}">${res.data.productos[i].nombreProducto}</option>
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
    axios({
      url:
        "http://localhost/Backend-portalBD/api/productos.php?id=" +
        (categoriaActiva.id - 1),
      method: "get",
      responseType: "json",
    })
      .then((res) => {
        let productos = Array();
        for (let i = 0; i < res.data.length; i++) {
          productos.push({
            id: res.data[i].id,
            nombreProducto: res.data[i].nombreProducto,
            imgProducto: res.data[i].imgProducto,
            descripcion: res.data[i].descripcion,
            precio: res.data[i].precio,
          });
        }
        let categoria = {
          id: categoriaActiva.id,
          nombreCategoria: document.getElementById("nombre").value,
          icono: document.getElementById("descripcion").value,
          productos: productos,
        };

        axios({
          url:
            "http://localhost/Backend-portalBD/api/categorias.php?id=" +
            (categoriaActiva.id - 1),
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
          text: "se ha agregado el producto correctamente",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => {
          vaciarSessionStorage();
          window.location = "../html/adminCategories.html";
        });
      })
      .catch((err) => {
        console.log(err);
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

function vaciarSessionStorage() {
  sessionStorage.setItem("Categoria Seleccionada", "");
}
