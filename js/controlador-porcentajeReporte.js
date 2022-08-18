var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

function llenarTablaPorcentaje() {
  axios({
    url: "http://localhost/Backend-portalBD/api/reportePorcentajes.php",
    method: "get",
    responseType: "json",
  }).then((res) => {
      console.log(res)
      document.getElementById("bodyreports").innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        document.getElementById("bodyreports").innerHTML += `
            <tr>
                <td>${res.data[i].id_usuario}</td>
                <td>${res.data[i].Nombre_Apellido}</td>
                <td>${res.data[i].Tipo_Pago}</td>
                <td>${res.data[i].porcentaje}</td>
                <td>${res.data[i].NOTAS}</td>
            </tr>
            `;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
llenarTablaPorcentaje();
