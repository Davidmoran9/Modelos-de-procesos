
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ fullName, email, username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "index.html";
});

let selectedCourse = '';

document.querySelectorAll('.course-selection').forEach(course => {
    course.addEventListener('click', function() {
        document.querySelectorAll('.course-selection').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedCourse = this.getAttribute('data-curso');
    });
});

function cargarHorarios() {
    const horarios = JSON.parse(localStorage.getItem('horarios')) || [];
    const cardContainer = document.getElementById('cardContainer');

    cardContainer.innerHTML = '';

    horarios.forEach(horario => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${horario.dia} - ${horario.hora}</h3>
            <p>Curso: ${horario.curso}</p>
            <p>Profesor: ${horario.profesor}</p>
            <p>Cupos: ${horario.cupos}</p>
        `;
        cardContainer.appendChild(card);
    });
}

function registrarEstudiante() {
    const nombre = document.getElementById('nombreEstudiante').value.trim();
    const tipoHorario = document.getElementById('seleccionarHorario').value;

    if (!nombre || tipoHorario === '' || selectedCourse === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const horarios = JSON.parse(localStorage.getItem('horarios')) || [];
    const horariosSeleccionados = horarios.filter(horario => 
        (tipoHorario === 'sabado' && horario.dia === 'Sábado' && horario.curso === selectedCourse) || 
        (tipoHorario === 'semana' && horario.dia !== 'Sábado' && horario.curso === selectedCourse)
    );

    let cuposDisponibles = false;
    let materiasMatriculadas = [];
    horariosSeleccionados.forEach(horario => {
        if (horario.cupos > 0) {
            cuposDisponibles = true;
            materiasMatriculadas.push(horario.curso);
            horario.cupos--;
        }
    });

    if (!cuposDisponibles) {
        alert('No hay cupos disponibles para el curso seleccionado en el horario elegido.');
        return;
    }

    localStorage.setItem('horarios', JSON.stringify(horarios));
    
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push({
        nombre,
        horario: tipoHorario === 'sabado' ? 'Sábado Intensivo' : 'Entre Semana',
        curso: selectedCourse
    });
    localStorage.setItem('registros', JSON.stringify(registros));

    alert(`Registro exitoso. Cupos restantes en el horario seleccionado.`);
    location.reload();
}

function imprimirRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    if (registros.length === 0) {
        alert("No hay registros disponibles.");
        return;
    }

    let contenido = "Registros de Estudiantes:\n\n";
    registros.forEach((registro, index) => {
        contenido += `Estudiante ${index + 1}:\n`;
        contenido += `Nombre: ${registro.nombre}\n`;
        contenido += `Horario: ${registro.horario}\n`;
        contenido += `Curso: ${registro.curso}\n\n`;
    });

    const blob = new Blob([contenido], { type: 'text/plain' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'registros_estudiantes.txt';
    enlace.click();
}

document.getElementById('registrarEstudiante').addEventListener('click', registrarEstudiante);
document.getElementById('imprimirRegistros').addEventListener('click', imprimirRegistros);
cargarHorarios();
