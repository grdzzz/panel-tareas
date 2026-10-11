const formulario = document.querySelector('form');
const listaPendientes = document.querySelector('#pendientes ul');
const listaCompletadas = document.querySelector('#completadas ul');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function formatearFecha(texto) {
  return new Date(texto + 'T00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
}

function dibujar() {
  listaPendientes.replaceChildren();
  listaCompletadas.replaceChildren();

  tareas.sort(function (a, b) {
    return a.fecha.localeCompare(b.fecha);
  });

  tareas.forEach(function (tarea) {
    const li = document.createElement('li');
    const negrita = document.createElement('strong');
    negrita.textContent = tarea.nombre;
    li.append(negrita, ', ' + tarea.asignatura + ', ' + formatearFecha(tarea.fecha));
        const borrar = document.createElement('button');
    borrar.textContent = '✕';
    borrar.addEventListener('click', function (evento) {
      evento.stopPropagation();
      tareas = tareas.filter(function (t) {
        return t !== tarea;
      });
      guardar();
      dibujar();
    });
    li.append(borrar);

    li.addEventListener('click', function () {
      tarea.completada = !tarea.completada;
      guardar();
      dibujar();
    });

    if (tarea.completada) {
      listaCompletadas.append(li);
    } else {
      listaPendientes.append(li);
    }
  });
}

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const select = document.querySelector('#as');
  tareas.push({
    nombre: document.querySelector('#nb').value,
    asignatura: select.options[select.selectedIndex].text,
    fecha: document.querySelector('#fe').value,
    completada: false
  });

  guardar();
  dibujar();
  formulario.reset();
});

dibujar();