document.addEventListener("DOMContentLoaded", () => {
    renderizarProfesores(); // Cargar profesores guardados al inicio
});

// Función para mostrar una notificación
function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = type === "success" ? "" : "error";
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}

// Función para confirmar acciones antes de ejecutarlas
function confirmAction(action, callback) {
    if (confirm(`¿Estás seguro de que deseas ${action.toLowerCase()}?`)) {
        callback(); // Ejecuta la acción si el usuario confirma
        showNotification(`${action} realizado con éxito.`, "success");
    } else {
        showNotification(`${action} cancelado.`, "error");
    }
}

// Función para alternar la visibilidad de un formulario
function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.classList.toggle("hidden");
}

// Función para agregar un nuevo profesor
function addProfesor(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const departamento = document.getElementById("departamento").value.trim();

    if (nombre === "" || departamento === "") {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
    }

    // Obtener los profesores actuales del localStorage, o un arreglo vacío si no hay nada
    const profesores = JSON.parse(localStorage.getItem("profesores")) || [];

    // Verificar si ya existe el profesor
    const existe = profesores.some(profesor => profesor.nombre === nombre && profesor.departamento === departamento);
    if (existe) {
        showNotification("El profesor ya existe.", "error");
        return;
    }

    // Crear un nuevo profesor y agregarlo al arreglo
    const nuevoProfesor = { nombre, departamento };
    profesores.push(nuevoProfesor);

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("profesores", JSON.stringify(profesores));

    // Actualizar la tabla
    renderizarProfesores();

    // Limpiar formulario
    limpiarFormulario("profesorForm");

    // Mostrar notificación
    showNotification("Profesor agregado exitosamente.", "success");

    // Ocultar formulario
    toggleForm("profesorForm");
}

// Función para renderizar los profesores guardados
function renderizarProfesores() {
    const profesores = JSON.parse(localStorage.getItem("profesores")) || [];
    const tableBody = document.getElementById("profesoresTableBody");

    // Limpiar la tabla antes de volver a renderizarla
    tableBody.innerHTML = "";

    profesores.forEach((profesor, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${profesor.nombre}</td>
            <td>${profesor.departamento}</td>
            <td><button onclick="confirmAction('Eliminar Profesor', () => eliminarProfesor(${index}))">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para eliminar un profesor
function eliminarProfesor(index) {
    const profesores = JSON.parse(localStorage.getItem("profesores")) || [];

    profesores.splice(index, 1); // Eliminar el profesor

    localStorage.setItem("profesores", JSON.stringify(profesores)); // Actualizar almacenamiento

    renderizarProfesores(); // Refrescar tabla
}

// Función para limpiar los campos de un formulario
function limpiarFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.querySelectorAll("input").forEach(input => (input.value = ""));
    }
}

// Función para agregar un horario
function addHorario(event) {
    event.preventDefault();
    const curso = document.getElementById("curso").value.trim();
    const horario = document.getElementById("horario").value.trim();

    if (curso === "" || horario === "") {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
    }

    const tableBody = document.getElementById("horariosTableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${curso}</td>
        <td>${horario}</td>
        <td><button onclick="confirmAction('Eliminar Horario', () => row.remove())">Eliminar</button></td>
    `;
    tableBody.appendChild(row);

    limpiarFormulario("horarioForm");
    toggleForm("horarioForm");
    showNotification("Horario agregado exitosamente.", "success");
}

// Función para agregar un curso
function addCurso(event) {
    event.preventDefault();
    const nombreCurso = document.getElementById("nombreCurso").value.trim();
    const numCupos = document.getElementById("numCupos").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (nombreCurso === "" || numCupos === "" || descripcion === "") {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
    }

    const tableBody = document.getElementById("cursosTableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nombreCurso}</td>
        <td>${numCupos}</td>
        <td>${descripcion}</td>
    `;
    tableBody.appendChild(row);

    limpiarFormulario("cursoForm");
    toggleForm("cursoForm");
    showNotification("Curso agregado exitosamente.", "success");
}
