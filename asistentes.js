document.addEventListener('DOMContentLoaded', function () {
    const output = document.getElementById('output');
    
    // Cargar datos guardados de Local Storage
    const savedData = JSON.parse(localStorage.getItem('estudiantesArray')) || [];
    const estudiantesConfirmados = savedData.filter(estudiante => estudiante.confirmado);

    estudiantesConfirmados.forEach(estudiante => {
        const estudianteDiv = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = estudiante.nombre;
        p.classList.add('color-asistencia');

        estudianteDiv.appendChild(p);
        output.appendChild(estudianteDiv);
    });
});
