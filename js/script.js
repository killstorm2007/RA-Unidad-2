"use strict"

document.addEventListener("DOMContentLoaded", function () {

    
    // 4. Detectar interacción del mouse con los botones
    const botones = document.querySelectorAll("button");

    botones.forEach(function (boton) {

        boton.addEventListener("mouseover", function () {
            boton.style.transform = "scale(1.05)";
            boton.style.transition = "transform 0.2s";
        });

        boton.addEventListener("mouseleave", function () {
            boton.style.transform = "scale(1)";
        });

    });

    // 2. Reloj dinámico en formato de 12 horas
    const reloj = document.getElementById("reloj");

    function actualizarReloj() {
        const ahora = new Date();

        reloj.textContent = ahora.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });
    }

    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    const formulario = document.getElementById("formularioContacto");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const telefono = document.getElementById("telefono");
        const mensaje = document.getElementById("mensaje");

        // 5. Comprobar que ningún campo esté vacío
        const campos = [nombre, correo, telefono, mensaje];

        for (const campo of campos) {
            if (campo.value.trim() === "") {
                alert("Error: todos los campos son obligatorios.");
                campo.focus();
                return;
            }
        }

        // Validar el formato del correo
        if (!correo.checkValidity()) {
            alert("Introduce un correo electrónico válido.");
            correo.focus();
            return;
        }

        // Crear el registro con los datos del formulario
        const contacto = {
            nombre: nombre.value.trim(),
            correo: correo.value.trim(),
            telefono: telefono.value.trim(),
            mensaje: mensaje.value.trim(),
            fecha: new Date().toLocaleString("es-MX")
        };

        try {
            // Recuperar registros anteriores
            const contactos = JSON.parse(
                localStorage.getItem("contactosInnovaTech") || "[]"
            );

            // Añadir el nuevo contacto
            contactos.push(contacto);

            // 7. Guardar los registros en el navegador
            localStorage.setItem(
                "contactosInnovaTech",
                JSON.stringify(contactos)
            );

            // 6. Confirmación interactiva
            const confirmar = confirm(
                "¡Registro exitoso, " + contacto.nombre +
                "\n\n¿Deseas registrar otro contacto?"
            );

            if (confirmar) {
                formulario.reset();
                nombre.focus();
            } else {
                formulario.reset();
            }

        } catch (error) {
            console.error("Error al guardar el contacto:", error);
            alert(
                "No fue posible guardar el registro. " +
                "Verifica el almacenamiento del navegador."
            );
        }
    });


    // Mensaje al utilizar el botón Limpiar
    formulario.addEventListener("reset", function () {
        console.log("Se han limpiado los campos del formulario.");
    });
});