document.addEventListener("DOMContentLoaded", () => {
    renderizarProfesores();
    renderizarHorarios();
    renderizarCursos();
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
        callback();
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

// Función para limpiar los campos de un formulario
function limpiarFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.querySelectorAll("input").forEach(input => (input.value = ""));
    }
}

//******************************PROFESORES******************************

function addProfesor(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const departamento = document.getElementById("departamento").value.trim();

    if (nombre === "" || departamento === "") {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
    }

    const profesores = JSON.parse(localStorage.getItem("profesores")) || [];

    const existe = profesores.some(profesor => profesor.nombre === nombre && profesor.departamento === departamento);
    if (existe) {
        showNotification("El profesor ya existe.", "error");
        return;
    }

    profesores.push({ nombre, departamento });

    localStorage.setItem("profesores", JSON.stringify(profesores));

    renderizarProfesores();
    limpiarFormulario("profesorForm");
    toggleForm("profesorForm");
    showNotification("Profesor agregado exitosamente.", "success");
}

function renderizarProfesores() {
    const profesores = JSON.parse(localStorage.getItem("profesores")) || [];
    const tableBody = document.getElementById("profesoresTableBody");

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

function eliminarProfesor(index) {
    const profesores = JSON.parse(localStorage.getItem("profesores")) || [];

    profesores.splice(index, 1);

    localStorage.setItem("profesores", JSON.stringify(profesores));

    renderizarProfesores();
}

//******************************HORARIOS******************************

function addHorario(event) {
    event.preventDefault();

    const curso = document.getElementById("curso").value.trim();
    const horario = document.getElementById("horario").value.trim();

    if (curso === "" || horario === "") {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
    }

    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];

    const existe = horarios.some(h => h.curso === curso && h.horario === horario);
    if (existe) {
        showNotification("Este horario ya está registrado.", "error");
        return;
    }

    horarios.push({ curso, horario });

    localStorage.setItem("horarios", JSON.stringify(horarios));

    renderizarHorarios();
    limpiarFormulario("horarioForm");
    toggleForm("horarioForm");
    showNotification("Horario agregado exitosamente.", "success");
}

function renderizarHorarios() {
    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    const tableBody = document.getElementById("horariosTableBody");

    tableBody.innerHTML = "";

    horarios.forEach((horario, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${horario.curso}</td>
            <td>${horario.horario}</td>
            <td><button onclick="confirmAction('Eliminar Horario', () => eliminarHorario(${index}))">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function eliminarHorario(index) {
    const horarios = JSON.parse(localStorage.getItem("horarios")) || [];

    horarios.splice(index, 1);

    localStorage.setItem("horarios", JSON.stringify(horarios));

    renderizarHorarios();
}

//******************************CURSOS******************************

function addCurso(event) {
    event.preventDefault();

    const nombreCurso = document.getElementById("nombreCurso").value.trim();
    const numCupos = document.getElementById("numCupos").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (nombreCurso === "" || numCupos === "" || descripcion === "") {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
    }

    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    const existe = cursos.some(curso => curso.nombreCurso === nombreCurso);
    if (existe) {
        showNotification("Este curso ya está registrado.", "error");
        return;
    }

    cursos.push({ nombreCurso, numCupos, descripcion });

    localStorage.setItem("cursos", JSON.stringify(cursos));

    renderizarCursos();
    limpiarFormulario("cursoForm");
    toggleForm("cursoForm");
    showNotification("Curso agregado exitosamente.", "success");
}

function renderizarCursos() {
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const tableBody = document.getElementById("cursosTableBody");

    tableBody.innerHTML = "";

    cursos.forEach((curso, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${curso.nombreCurso}</td>
            <td>${curso.numCupos}</td>
            <td>${curso.descripcion}</td>
            <td><button onclick="confirmAction('Eliminar Curso', () => eliminarCurso(${index}))">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function eliminarCurso(index) {
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    cursos.splice(index, 1);

    localStorage.setItem("cursos", JSON.stringify(cursos));

    renderizarCursos();
}
