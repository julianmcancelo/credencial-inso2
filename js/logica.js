// ============================================================================
// SCRIPT: MODO APRENDIZAJE Y EDITOR EN VIVO
// ============================================================================
// Este script maneja la lógica para activar ayudas visuales y la edición en tiempo real.

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // 1. SELECCIÓN DE ELEMENTOS DOM
    // ------------------------------------------------------------------------
    
    // Botones Principales
    const botonAprendizaje = document.getElementById('btn-aprendizaje');
    const botonGirar = document.getElementById('btn-girar');
    const botonEditor = document.getElementById('btn-editor');
    
    // Contenedores y Paneles
    const body = document.body;
    const tarjeta = document.querySelector('.contenedor-tarjeta');
    const panelInfo = document.getElementById('panel-info');
    const panelEditor = document.getElementById('panel-editor');

    // Elementos del Panel de Información (Derecha)
    const infoTitulo = document.getElementById('info-titulo');
    const infoDescripcion = document.getElementById('info-descripcion');
    const infoCodigo = document.getElementById('info-codigo');
    const puntosInteractivos = document.querySelectorAll('.punto-interactivo');

    // Elementos del Editor (Izquierda)
    const inputNombre = document.getElementById('input-nombre');
    const inputRol = document.getElementById('input-rol');
    const inputId = document.getElementById('input-id');

    // Elementos de la Tarjeta (Destino de la edición)
    const cardNombre = document.getElementById('card-nombre');
    const cardRol = document.getElementById('card-rol');
    const cardId = document.getElementById('card-id');

    // ------------------------------------------------------------------------
    // 2. LÓGICA DEL MODO APRENDIZAJE
    // ------------------------------------------------------------------------
    botonAprendizaje.addEventListener('click', () => {
        body.classList.toggle('modo-aprendizaje-activo');

        if (body.classList.contains('modo-aprendizaje-activo')) {
            botonAprendizaje.innerHTML = '<i class="fas fa-book-open"></i> Desactivar Modo Aprendizaje';
            botonAprendizaje.classList.add('activo');
            // Reseteamos el giro al entrar al modo
            tarjeta.classList.remove('girada');
        } else {
            botonAprendizaje.innerHTML = '<i class="fas fa-graduation-cap"></i> Activar Modo Aprendizaje';
            botonAprendizaje.classList.remove('activo');
            // Quitamos la clase girada para que vuelva al comportamiento hover normal
            tarjeta.classList.remove('girada');
            // Ocultamos el panel de info si estaba visible
            panelInfo.classList.remove('visible');
        }
    });

    // ------------------------------------------------------------------------
    // 3. LÓGICA DEL BOTÓN GIRAR (Manual)
    // ------------------------------------------------------------------------
    botonGirar.addEventListener('click', () => {
        tarjeta.classList.toggle('girada');
    });

    // ------------------------------------------------------------------------
    // 4. LÓGICA DE LOS PUNTOS INTERACTIVOS (Hotspots)
    // ------------------------------------------------------------------------
    puntosInteractivos.forEach(punto => {
        punto.addEventListener('mouseenter', () => {
            if (!body.classList.contains('modo-aprendizaje-activo')) return;

            // Obtenemos los datos del punto
            const titulo = punto.getAttribute('data-titulo');
            const descripcion = punto.getAttribute('data-descripcion');
            const codigo = punto.getAttribute('data-codigo');

            // Actualizamos el panel
            infoTitulo.textContent = titulo;
            infoDescripcion.textContent = descripcion;
            infoCodigo.textContent = codigo;

            // Mostramos el panel
            panelInfo.classList.add('visible');
        });
    });

    // ------------------------------------------------------------------------
    // 5. LÓGICA DEL EDITOR EN VIVO
    // ------------------------------------------------------------------------
    
    // Toggle del Panel de Editor
    botonEditor.addEventListener('click', () => {
        panelEditor.classList.toggle('visible');
        botonEditor.classList.toggle('activo');
        
        // Cambiar ícono según estado
        if (panelEditor.classList.contains('visible')) {
            botonEditor.innerHTML = '<i class="fas fa-times"></i> Cerrar Editor';
        } else {
            botonEditor.innerHTML = '<i class="fas fa-pen"></i> Editar Datos';
        }
    });

    // Función genérica para actualizar texto
    const actualizarTexto = (input, elemento) => {
        input.addEventListener('input', (e) => {
            elemento.innerText = e.target.value || '...'; // Placeholder si está vacío
            
            // Efecto visual simple para indicar cambio (opcional)
            elemento.style.color = '#e65100'; // Naranja oscuro momentáneo
            setTimeout(() => {
                elemento.style.color = ''; // Volver al original (definido en CSS)
            }, 300);
        });
    };

    // Inicializar valores del input con lo que hay en la tarjeta
    // (Para que al abrir el editor ya tenga los datos actuales)
    if(cardNombre) inputNombre.value = cardNombre.innerText.replace(/\n/g, ' '); // Quitar saltos de línea
    if(cardRol) inputRol.value = cardRol.innerText;
    if(cardId) inputId.value = cardId.innerText.replace('ID: ', '');

    // Vincular inputs con elementos
    actualizarTexto(inputNombre, cardNombre);
    actualizarTexto(inputRol, cardRol);
    
    // Caso especial para el ID (mantener el prefijo "ID: ")
    inputId.addEventListener('input', (e) => {
        cardId.innerText = `ID: ${e.target.value}`;
        cardId.style.color = '#e65100';
        setTimeout(() => cardId.style.color = '', 300);
    });

});
