document.addEventListener('DOMContentLoaded', function () {
    const output = document.getElementById('output');
    
    // Cargar datos guardados de Local Storage
    const savedData = JSON.parse(localStorage.getItem('students')) || [];
    const confirmedStudents = savedData.filter(student => student.confirmed);

    confirmedStudents.forEach(student => {
        const studentDiv = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = student.name;
        p.classList.add('attendance-confirmed');

        studentDiv.appendChild(p);
        output.appendChild(studentDiv);
    });
});
