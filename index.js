//Carga de datos guardados y manejo del formulario que  se ejecutará después de que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', function () {

    //selecciona elementos del Dom.
    const dataForm = document.getElementById('dataForm');
    const salidaDatos = document.getElementById('salidaDatos');

    // Cargar datos guardados de Local Storage.
    const datosGuardados = JSON.parse(localStorage.getItem('estudiantesArray')) || [];

    //Itera sobre cada estudiante en los datos guardados y llama a agregarEstudianteAlDom para agregarlo al DOM.
    datosGuardados.forEach(function(estudiante) {
        agregarEstudianteAlDom(estudiante.nombre, estudiante.confirmado);});

    //Funcion que se activa con el submit del form  
    dataForm.addEventListener('submit', function(event){

        //event.preventDefault previene que la pagina no recargue por defecto
        event.preventDefault();
        
        //Obtener el valor del input
        const datosInput = document.getElementById('datosInput').value.trim();
        
        // Verificar si el nombre ya existe
        if (verificarDuplicado(datosInput)) {
            alert('El nombre ya existe. Por favor, ingrese un nombre diferente.');
            return;
        }
        //Agrega estudiantes al dom y Local storage
        agregarEstudianteAlDom(datosInput, false);
        guardarEstudianteEnLocalStorage(datosInput, false);

        //Resetea el form
        dataForm.reset();
    });

    function guardarEstudianteEnLocalStorage(nombre, confirmado) {
        //Obtener y parsear datos del Local Storage:
        const estudiantesArray = JSON.parse(localStorage.getItem('estudiantesArray')) || [];
        //Agregar un nuevo estudiante al array:
        estudiantesArray.push({ nombre, confirmado });
        //Guardar el array actualizado en el Local Storage:
        localStorage.setItem('estudiantesArray', JSON.stringify(estudiantesArray));
    }

    function verificarDuplicado(nombre) {
        //Obtener y parsear datos del Local Storage:
        const estudiantesArray = JSON.parse(localStorage.getItem('estudiantesArray')) || [];
        //Some devuelve true si encuentra algún estudiante repetido ignorando mayusculas
        return estudiantesArray.some(estudiante => estudiante.nombre.toLowerCase() === nombre.toLowerCase());
    }

    function actualizarEstudianteEnLocalStorage(nombre, confirmado) {
        //Obtener y parsear datos del Local Storage:
        let estudiantesArray = JSON.parse(localStorage.getItem('estudiantesArray')) || [];
        //map(...) itera sobre cada estudiante, (=>) comprueba si el nombre del estudiante coincide y se crea un nuevo objeto en caso de que coincida
        estudiantesArray = estudiantesArray.map(estudiante => estudiante.nombre === nombre ? { nombre, confirmado } : estudiante);
        //Guardar el array actualizado en el Local Storage:
        localStorage.setItem('estudiantesArray', JSON.stringify(estudiantesArray));
    }

    function removeestudianteFromLocalStorage(nombre) {
        //Obtener y parsear datos del Local Storage:
        let estudiantesArray = JSON.parse(localStorage.getItem('estudiantesArray')) || [];
        //Filtrar el array dejar estudiantes con el nombre diferente al del estudiante con el nombre dado:
        estudiantesArray = estudiantesArray.filter(estudiante => estudiante.nombre !== nombre);
        //Guardar el array actualizado en el Local Storage:
        localStorage.setItem('estudiantesArray', JSON.stringify(estudiantesArray));
    }

    function agregarEstudianteAlDom(nombre, confirmado) {
        // Crear un nuevo div para el estudiante
        const estudianteDiv = document.createElement('div');
        //Crea el elemento p y le inserta el prop nombre 
        const p = document.createElement('p');
        p.textContent = nombre;
        // Si el estudiante está confirmado, añadir la clase 'color-asistencia' al p
        if (confirmado) {
            p.classList.add('color-asistencia');
        }

        // Crear boton de confirmar y le inserta el texto de confirmar asistencia
        const BotonConfirmar = document.createElement('button');
        BotonConfirmar.textContent = 'Confirmar Asistencia';
        //Se le agrega un listener de click para que agrege el color y el boleano de asistencia 
        BotonConfirmar.addEventListener('click', function() {
            p.classList.add('color-asistencia');
            actualizarEstudianteEnLocalStorage(nombre, true);
        });

        // Crear boton de borrar y le inserta el texto de eliminar
        const BotonBorrar = document.createElement('button');
        BotonBorrar.textContent = 'Eliminar';
        //Se le agrega un listener de click para que elimine el div del dom y su nombre del array 
        BotonBorrar.addEventListener('click', function() {
            estudianteDiv.remove();
            removeestudianteFromLocalStorage(nombre);
        });

        //Appendchild() se usa para colocar un elemento dentro de otro elemento
        //Agrega el elemento p (nombre) como hijo del elemento estudianteDiv
        estudianteDiv.appendChild(p);
        //Agrega el BotonConfirmar como hijo del elemento estudianteDiv.
        estudianteDiv.appendChild(BotonConfirmar);
        //Agrega el BotonConfirmar como hijo del elemento estudianteDiv.
        estudianteDiv.appendChild(BotonBorrar);
        //Agrega el elemento estudianteDiv (con nombre y botones) al elemento del DOM con el id salidaDatos.
        salidaDatos.appendChild(estudianteDiv);
    }   

});
