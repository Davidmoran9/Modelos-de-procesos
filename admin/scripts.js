function confirmAction(action) {
    if (confirm(`¿Estás seguro de que deseas ${action.toLowerCase()}?`)) {
        showNotification(`${action} realizado con éxito.`, 'success');
    } else {
        showNotification(`${action} cancelado.`, 'error');
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = type === 'success' ? '' : 'error';
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.classList.toggle('hidden');
}

function addProfesor(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const departamento = document.getElementById('departamento').value;
    const tableBody = document.getElementById('profesoresTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${nombre}</td><td>${departamento}</td><td><button onclick="confirmAction('Eliminar Profesor')">Eliminar</button></td>`;
    tableBody.appendChild(row);
    toggleForm('profesorForm');
}

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
