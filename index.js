document.addEventListener('DOMContentLoaded', function () {
    const dataForm = document.getElementById('dataForm');
    const output = document.getElementById('output');
    
    // Cargar datos guardados de Local Storage
    const savedData = JSON.parse(localStorage.getItem('students')) || [];
    savedData.forEach(student => addStudentToDOM(student.name, student.confirmed));

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputData = document.getElementById('inputData').value.trim();
        
        // Verificar si el nombre ya existe
        if (isNameDuplicate(inputData)) {
            alert('El nombre ya existe. Por favor, ingrese un nombre diferente.');
            return;
        }

        addStudentToDOM(inputData, false);
        saveStudentToLocalStorage(inputData, false);

        dataForm.reset();
    });

    function addStudentToDOM(name, confirmed) {
        const studentDiv = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = name;
        if (confirmed) {
            p.classList.add('attendance-confirmed');
        }

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar Asistencia';
        confirmButton.addEventListener('click', function() {
            p.classList.add('attendance-confirmed');
            updateStudentInLocalStorage(name, true);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            studentDiv.remove();
            removeStudentFromLocalStorage(name);
        });

        studentDiv.appendChild(p);
        studentDiv.appendChild(confirmButton);
        studentDiv.appendChild(deleteButton);
        output.appendChild(studentDiv);
    }

    function saveStudentToLocalStorage(name, confirmed) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name, confirmed });
        localStorage.setItem('students', JSON.stringify(students));
    }

    function updateStudentInLocalStorage(name, confirmed) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.map(student => student.name === name ? { name, confirmed } : student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    function removeStudentFromLocalStorage(name) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(student => student.name !== name);
        localStorage.setItem('students', JSON.stringify(students));
    }

    function isNameDuplicate(name) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        return students.some(student => student.name.toLowerCase() === name.toLowerCase());
    }
});
