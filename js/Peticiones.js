const d = document,
  $table = d.getElementById("crud-table"),
  $form = d.getElementById("crud-form"),
  $title = d.getElementById("titulo-contactos"),
  $template = d.getElementById("crud-template").content,
  $fragmento = d.createDocumentFragment();
window.onload = async function getUsers() {
  try {
    const consulta = fetch("http://localhost:3000/contactos");
    console.log(consulta);
    const respuesta = await consulta.json();
    const resultado = respuesta;
    resultado.forEach((element) => {
      $template.querySelector(".id").textContent = element.id;
      $template.querySelector(".nombre").textContent = element.nombre;
      $template.querySelector(".apellido").textContent = element.apellido;
      $template.querySelector(".edad").textContent = element.edad;
      $template.querySelector(".telefono").textContent = element.telefono;
      $template.querySelector(".correo").textContent = element.correo;

      $template.getElementById("actualizar").dataset.id = element.id;
      $template.getElementById("actualizar").dataset.nombre = element.nombre;
      $template.getElementById("actualizar").dataset.apellido =
        element.apellido;
      $template.getElementById("actualizar").dataset.edad = element.edad;
      $template.getElementById("actualizar").dataset.telefono =
        element.telefono;
      $template.getElementById("actualizar").dataset.correo = element.correo;

      $template.getElementById("eliminar").dataset.id = element.id;
      let $clone = d.importNode($template, true);
      $fragmento.appendChild($clone);
    });

    $table.querySelector("tbody").appendChild($fragmento);
  } catch (error) {
    console.log(error);
  }
};
const ajax = (option) => {
  let { url, method, success, error, data } = option;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      console.log("ocurrio un error");
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};

d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();
    if (!e.target.id.value) {
      ajax({
        url: "http://localhost:3000/contactos",
        method: "POST",
        success: () => {
          location.reload();
        },
        data: {
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,
          edad: e.target.edad.value,
          telefono: e.target.telefono.value,
          correo: e.target.correo.value,
        },
      });
    } else {
      ajax({
        url: `http://localhost:3000/contactos/${e.target.id.value}`,
        method: "PUT",
        success: () => {
          location.reload();
        },
        data: {
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,
          edad: e.target.edad.value,
          telefono: e.target.telefono.value,
          correo: e.target.correo.value,
        },
      });
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".actualizar")) {
    $title.textContent = "Editar contacto";
    $form.nombre.value = e.target.dataset.nombre;
    $form.apellido.value = e.target.dataset.apellido;
    $form.edad.value = e.target.dataset.edad;
    $form.telefono.value = e.target.dataset.telefono;
    $form.correo.value = e.target.dataset.correo;
    $form.id.value = e.target.dataset.id;
  }
  if (e.target.matches(".eliminar")) {
    let isdelete = confirm(`Esta seguro de eliminar ${e.target.dataset.id}`);
    if (isdelete) {
      let configuracion = {
        method: "DELETE",
      };
      const respuesta = fetch(
        `http://localhost:3000/contactos/${e.target.dataset.id}`,
        configuracion
      )
        .then((res) => {
          res.json;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  document.getElementById("buscar").addEventListener("click", async (e) => {
    e.preventDefault();
    const valor = document.getElementById("busqueda").value;
    await getUsers(valor);
  });
});
