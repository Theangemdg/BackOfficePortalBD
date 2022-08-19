var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

function reporteMasPedidoUsuario() {
  axios({
    url: "http://localhost/Backend-portalBD/api/porcentajeCategorias.php",
    method: "get",
    responseType: "json",
  }).then((res) => {
      console.log(res);
      document.getElementById("reportePorcentajeCategorias").innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        document.getElementById("reportePorcentajeCategorias").innerHTML += `
            <tr>
                <td>${res.data[i].productName}</td>
                <td>${res.data[i].nombreCategoria}</td>
                <td>${res.data[i].VentasTotalesPorCategoria}</td>
                <td>${res.data[i].Year}</td>
                <td>${res.data[i].PorcentajeDeVentasPorCategoria}%</td>
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