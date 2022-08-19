var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

var empleadoSeleccionado = JSON.parse(
  sessionStorage.getItem("Empleado Seleccionado")
);
console.log(empleadoSeleccionado);
document.getElementById("nombre").value = empleadoSeleccionado.nombre;
document.getElementById("apellido").value = empleadoSeleccionado.apellido;
document.getElementById("correo").value = empleadoSeleccionado.correo;
document.getElementById("telefono").value = empleadoSeleccionado.telefono;
document.getElementById("edad").value = empleadoSeleccionado.edad;
document.getElementById("tpEmpleado").value = empleadoSeleccionado.id_tipoEmpleado;

// axios({
//    url:
//     "http://localhost/Backend-portalBD/api/empleados.php?id=" +
//     empleadoSeleccionado.id_empleado,
//   method: "get",
//   responseType: "json",
// })
//   .then((res) => {
//    console.log(res.data);
//  document.getElementById("tpEmpleado").innerHTML = "";
//    for (let i = 0; i < res.data.length; i++) {
//        document.getElementById(
//         "tpEmpleado"
//        ).innerHTML += `<option value="${i}">${res.data[i].id_tipoEmpleado}</option>
//          `;
//      }
//    })
//    .catch((err) => {
//      console.log(err);
//    });

function editarEmpleado() {
    let txtnombre = document.getElementById("nombre").value;
    let txtapellido = document.getElementById("apellido").value;
    let txtcorreo = document.getElementById("correo").value;
    let txttelefono = document.getElementById("telefono").value;
    let txtedad = document.getElementById("edad").value;
    let txttipoEmpleado = document.getElementById("tpEmpleado").value;

    if (txtnombre && txtapellido && txtcorreo && txttelefono && txtedad && txttipoEmpleado) {
    let empleado = {
      id_empleado: empleadoSeleccionado.id_empleado,
      id_tipoEmpleado: document.getElementById("tpEmpleado").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      telefono: document.getElementById("telefono").value,
      edad: document.getElementById("edad").value,
      correo: document.getElementById("correo").value,
      fechaDeContratacion: empleadoSeleccionado.fechaDeContratacion,

    };

    axios({
      url:
        "http://localhost/Backend-portalBD/api/empleados.php?id=" +
        empleadoSeleccionado.id_empleado,
      method: "put",
      responseType: "json",
      data: empleado,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Swal.fire({
      icon: "success",
      title: "Actualizado!",
      text: "se ha actualizado el empleado correctamente",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      vaciarSessionStorage();
      window.location = "../html/adminEmpleados.html";
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
  sessionStorage.setItem("Empleado Seleccionado", "");
}
