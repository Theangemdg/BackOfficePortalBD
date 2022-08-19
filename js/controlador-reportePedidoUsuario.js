var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

function reporteMasPedidoUsuario() {
  axios({
    url: "http://localhost/Backend-portalBD/api/masPedidoCliente.php",
    method: "get",
    responseType: "json",
  }).then((res) => {
      console.log(res);
      document.getElementById("reportePedidoUsuario").innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        document.getElementById("reportePedidoUsuario").innerHTML += `
            <tr>
                <td>${res.data[i].userName} ${res.data[i].apellido}</td>
                <td>${res.data[i].productName}</td>
                <td>${res.data[i].cantidad}</td>
                <td>${res.data[i].precio}</td>
                <td>${res.data[i].Total}</td>
                <td>${res.data[i].Year}</td>
            </tr>
            `;
            console.log('test')
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
reporteMasPedidoUsuario();