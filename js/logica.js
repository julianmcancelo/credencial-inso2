// ============================================================================
// SCRIPT: MODO APRENDIZAJE
// ============================================================================
// Este script maneja la lógica para activar y desactivar las ayudas visuales.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos los elementos
    const botonAprendizaje = document.getElementById('btn-aprendizaje');
    const botonGirar = document.getElementById('btn-girar');
    const body = document.body;
    const tarjeta = document.querySelector('.contenedor-tarjeta');

    // Elementos del Panel Lateral
    const panelInfo = document.getElementById('panel-info');
    const infoTitulo = document.getElementById('info-titulo');
    const infoDescripcion = document.getElementById('info-descripcion');
    const infoCodigo = document.getElementById('info-codigo');
    const puntosInteractivos = document.querySelectorAll('.punto-interactivo');

    // 2. Lógica del Modo Aprendizaje
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
            // Ocultamos el panel si estaba visible
            panelInfo.classList.remove('visible');
        }
    });

    // 3. Lógica del Botón Girar
    botonGirar.addEventListener('click', () => {
        tarjeta.classList.toggle('girada');
    });

    // 4. Lógica de los Puntos Interactivos (Hotspots)
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

        // Opcional: Ocultar al salir (si se prefiere que quede fijo hasta tocar otro)
        // punto.addEventListener('mouseleave', () => {
        //     panelInfo.classList.remove('visible');
        // });
    });
});
