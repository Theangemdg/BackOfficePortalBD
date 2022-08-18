function validarCampo() {
  let txtcorreo = document.getElementById("exampleInputEmail").value;
  let txtcontrasena = document.getElementById("exampleInputPassword").value;
  console.log(txtcorreo + txtcontrasena)
  if (txtcorreo && txtcontrasena) {
    axios({
      url: "http://localhost/Backend-portalBD/api/administradores.php",
      method: "get",
      responseType: "json",
    })
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].correo == txtcorreo &&
            res.data[i].contraseña == txtcontrasena
          ) {
            sessionStorage.setItem(
              "Usuario activo",
              JSON.stringify(res.data[i])
            );
            window.location = "../html/menuPrincipal.html";
          }
        }
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
