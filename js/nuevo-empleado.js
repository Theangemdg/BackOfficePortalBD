var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

const Tiempo = Date.now();
const fecha = new Date(Tiempo);

function nuevoEmpleado() {
    let txtnombre = document.getElementById("nombre").value;
    let txtapellido = document.getElementById("apellido").value;
    let txtcorreo = document.getElementById("correo").value;
    let txttelefono = document.getElementById("telefono").value;
    let texedad = document.getElementById("edad").value;
    let tipoEmpleado = document.getElementById("tpEmpleado").value;
    let fechaContratacion = fecha;
  
    if (txtnombre && txtapellido && txtcorreo && txttelefono && texedad && tipoEmpleado) {
      axios({
        url: "http://localhost/Backend-portalBD/api/empleados.php",
        method: "get",
        responseType: "json",
      })
        .then((res) => {
          let empleado = {
            id_empleado: res.data.length + 1,
            id_tipoEmpleado: tipoEmpleado,
            nombre: txtnombre,
            apellido: txtapellido,
            telefono: txttelefono,
            edad: texedad,
            correo: txtcorreo,
            fechaDeContratacion: fechaContratacion,
          };
  
          axios({
            url: "http://localhost/Backend-portalBD/api/empleados.php",
            method: "post",
            responseType: "json",
            data: empleado,
          })
            .then((res) => {
              console.log(res);
              Swal.fire({
                icon: "success",
                title: "Agregado!",
                text: "se ha agregado el empleado correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
              limpiarInputs();
            })
            .catch((err) => {
              console.log(err);
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
  
  function limpiarInputs() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
  }
  