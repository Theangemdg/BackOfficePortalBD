var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;


function llenarTablaEmpleados() {
    axios({
      url: "http://localhost/Backend-portalBD/api/empleados.php",
      method: "get",
      responseType: "json",
    }).then((res) => {
        console.log(res)
        document.getElementById("bodyempleados").innerHTML = "";
        for (let i = 0; i < res.data.length; i++) {
          document.getElementById("bodyempleados").innerHTML += `
              <tr>
                  <td>${res.data[i].id_empleado}</td>
                  <td>${res.data[i].id_tipoEmpleado}</td>
                  <td>${res.data[i].nombre}</td>
                  <td>${res.data[i].apellido}</td>
                  <td>${res.data[i].edad}</td>
                  <td>${res.data[i].telefono}</td>
                  <td>${res.data[i].correo}</td>
                  <td>${res.data[i].fechaDeContratacion}</td>
                  <td>
                  <a class="btn btn-info" href="../html/editarEmpleado.html" onclick="empleadoSeleccionado(${res.data[i].id_empleado})">
                  <i class="fas fa-pen"></i>
                  </td>
              </tr>

              
          </a>
              `;

              
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  llenarTablaEmpleados();

  
function empleadoSeleccionado(idEmpleado) {
  console.log(idEmpleado)
  axios({
    url:
      "http://localhost/Backend-portalBD/api/empleados.php?id=" + idEmpleado,
    method: "get",
    responseType: "json",
  })
    .then((res) => {
      console.log(res.data)
      sessionStorage.setItem(
        "Empleado Seleccionado",
        JSON.stringify(res.data)
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
