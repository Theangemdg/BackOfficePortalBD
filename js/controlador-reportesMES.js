var clienteActivo = JSON.parse(sessionStorage.getItem("Usuario activo"));
document.getElementById("userDropdown").innerHTML = "";
document.getElementById("userDropdown").innerHTML = `
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`;

function ReporteMES() {
    var mes = document.getElementById("mes").value;
  axios({
    url: "http://localhost/Backend-portalBD/api/reporteMes.php?id=" + mes,
    method: "get",
    responseType: "json",
  }).then((res) => {
      console.log(res)
      document.getElementById("monthReports").innerHTML = "";
      for (let i = 0; i < res.data.length; i++) {
        document.getElementById("monthReports").innerHTML += `
            <tr>
                <td>${res.data[i].Año}</td>
                <td>${res.data[i].Mes}</td>
                <td>${res.data[i].id_producto}</td>
                <td>${res.data[i].Producto}</td>
                <td>${res.data[i].CantidadPorMes}</td>
                <td>${res.data[i].MejorEmpleadoDelMes}</td>
                <td>${res.data[i].OrdenesPorMes}</td>
            </tr>
            `;
            console.log('test')
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
