// Función para mostrar una notificación
function confirmAction(action) {
    if (confirm(`¿Estás seguro de que deseas ${action.toLowerCase()}?`)) {
        showNotification(`${action} realizado con éxito.`, 'success');
    } else {
        showNotification(`${action} cancelado.`, 'error');
    }
}

// Función para mostrar la notificación en pantalla
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = type === 'success' ? '' : 'error';
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Función para alternar la visibilidad de un formulario
function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.classList.toggle('hidden');
}

// Función para agregar un nuevo profesor
function addProfesor(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const departamento = document.getElementById('departamento').value;

    // Obtener los profesores actuales del localStorage, o un arreglo vacío si no hay nada
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    
    // Crear un nuevo profesor y agregarlo al arreglo
    const nuevoProfesor = { nombre, departamento };
    profesores.push(nuevoProfesor);
    
    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem('profesores', JSON.stringify(profesores));
    
    // Actualizar la tabla
    renderizarProfesores();
    toggleForm('profesorForm');
}

// Función para renderizar los profesores guardados
function renderizarProfesores() {
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    const tableBody = document.getElementById('profesoresTableBody');
    
    // Limpiar la tabla antes de volver a renderizarla
    tableBody.innerHTML = '';

    profesores.forEach((profesor, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${profesor.nombre}</td>
            <td>${profesor.departamento}</td>
            <td><button onclick="eliminarProfesor(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Llamamos a la función al cargar la página para que se rendericen los profesores guardados
document.addEventListener('DOMContentLoaded', renderizarProfesores);

// Función para eliminar un profesor
function eliminarProfesor(index) {
    // Obtener los profesores del localStorage
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    
    // Eliminar el profesor en la posición indicada
    profesores.splice(index, 1);
    
    // Volver a guardar el arreglo actualizado en el localStorage
    localStorage.setItem('profesores', JSON.stringify(profesores));
    
    // Volver a renderizar la tabla para reflejar el cambio
    renderizarProfesores();
}

// Función para agregar un horario
function addHorario(event) {
    event.preventDefault();
    const curso = document.getElementById('curso').value;
    const horario = document.getElementById('horario').value;
    const tableBody = document.getElementById('horariosTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${curso}</td><td>${horario}</td><td><button onclick="confirmAction('Eliminar Horario')">Eliminar</button></td>`;
    tableBody.appendChild(row);
    toggleForm('horarioForm');
}

// Función para agregar un curso
function addCurso(event) {
    event.preventDefault();
    const nombreCurso = document.getElementById('nombreCurso').value;
    const numCupos = document.getElementById('numCupos').value;
    const descripcion = document.getElementById('descripcion').value;
    const tableBody = document.getElementById('cursosTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${nombreCurso}</td><td>${numCupos}</td><td>${descripcion}</td>`;
    tableBody.appendChild(row);
    toggleForm('cursoForm');
}
