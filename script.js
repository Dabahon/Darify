$(document).ready(function () {
    $('.tab-links a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');

        // Muestra/oculta las pestañas
        $('.tabs ' + currentAttrValue).show().siblings().hide();

        // Cambia/remueve la clase 'activa' de las pestañas
        $(this).parent('li').addClass('activa').siblings().removeClass('activa');

        e.preventDefault();
    });

    // Código para la funcionalidad de acordeón en las preguntas frecuentes
    $('.faq .acordeon .titulo').click(function () {
        $(this).next('.contenido').slideToggle();
        $('.faq .acordeon .contenido').not($(this).next()).slideUp();
    });


    // Inicialización del calendario
    function initCalendar() {
        var today = new Date();
        renderCalendar(today.getFullYear(), today.getMonth());
    }

    // Función para renderizar el calendario
    function renderCalendar(year, month) {
        var date = new Date(year, month);
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var firstDay = new Date(year, month, 1).getDay();

        // Corrección para que la semana comience en lunes
        var firstDayAdjusted = (firstDay === 0) ? 6 : firstDay - 1;

        var daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        var calendarHtml = '<div class="calendario-nav"><button id="prev-month">←</button><span>' + date.toLocaleDateString('es', { month: 'long', year: 'numeric' }) + '</span><button id="next-month">→</button></div>';
        calendarHtml += '<div class="calendario-grid">';

        // Añadir los días de la semana
        daysOfWeek.forEach(function (day) {
            calendarHtml += '<div class="calendario-day-name">' + day + '</div>';
        });

        // Ajuste para el comienzo de mes
        for (let i = 0; i < firstDayAdjusted; i++) {
            calendarHtml += '<div class="calendario-day empty"></div>';
        }
        for (let day = 1; day <= daysInMonth; day++) {
            calendarHtml += '<div class="calendario-day">' + day + '</div>';
        }
        calendarHtml += '</div>';

        $('#calendario').html(calendarHtml);

        // Botones para navegar entre meses
        $('#prev-month').on('click', function () {
            renderCalendar(year, month - 1);
        });
        $('#next-month').on('click', function () {
            renderCalendar(year, month + 1);
        });
    }


    initCalendar();

    $("#ventanaModal").click(function() {
        $("#modal").css("display", "block");
        showSlides(slideIndex = 1);
    });

    $(".cerrar").click(function() {
        $("#modal").css("display", "none");
    });

    var slideIndex = 1;
    function showSlides(n) {
        var i;
        var slides = $(".slide");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        slides.each(function() {
            $(this).css("display", "none");
        });
        slides.eq(slideIndex - 1).css("display", "block");
    }

    $(".anterior").click(function() {
        showSlides(slideIndex -= 1);
    });

    $(".siguiente").click(function() {
        showSlides(slideIndex += 1);
    });

    $('#formularioRegistro').submit(function (e) {
        // Prevenir el envío por defecto
        e.preventDefault(); 
        let valido = true;

        // Validar Nombre
        if ($('#nombre').val().trim() === '') {
            $('#nombre').addClass('error');
            $('#nombre').next('.mensaje-error').text('El nombre no puede estar vacío.');
            valido = false;
        } else {
            $('#nombre').removeClass('error');
            $('#nombre').next('.mensaje-error').text('');
        }

        // Validar Apellidos
        if ($('#apellidos').val().trim() === '') {
            $('#apellidos').addClass('error');
            $('#apellidos').next('.mensaje-error').text('Los apellidos no pueden estar vacíos.');
            valido = false;
        } else {
            $('#apellidos').removeClass('error');
            $('#apellidos').next('.mensaje-error').text('');
        }

        // Validar Teléfono
        if ($('#telefono').val().trim() === '') {
            $('#telefono').addClass('error');
            $('#telefono').next('.mensaje-error').text('El teléfono no puede estar vacío.');
            valido = false;
        } else {
            $('#telefono').removeClass('error');
            $('#telefono').next('.mensaje-error').text('');
        }

        // Validar Correo Electrónico
        if ($('#correo').val().trim() === '' || !$('#correo').val().includes('@')) {
            $('#correo').addClass('error');
            $('#correo').next('.mensaje-error').text('El correo electrónico no es válido.');
            valido = false;
        } else {
            $('#correo').removeClass('error');
            $('#correo').next('.mensaje-error').text('');
        }

        // Validar Usuario
        if ($('#usuario').val().trim() === '' || $('#usuario').val().includes(' ')) {
            $('#usuario').addClass('error');
            $('#usuario').next('.mensaje-error').text('El usuario no puede estar vacío ni contener espacios.');
            valido = false;
        } else {
            $('#usuario').removeClass('error');
            $('#usuario').next('.mensaje-error').text('');
        }

        // Validar Contraseña
        const contrasena = $('#contrasena').val();
        const resultadoValidacion = validarContrasena(contrasena);
        if (contrasena.trim() === '' || resultadoValidacion !== true) {
            $('#contrasena').addClass('error');
            // Usamos el resultado de validarContrasena para mostrar mensajes específicos
            $('#contrasena').next('.mensaje-error').html(resultadoValidacion);
            valido = false;
        } else {
            $('#contrasena').removeClass('error');
            $('#contrasena').next('.mensaje-error').text('');
        }

        if (valido) {
            // Aquí puedes agregar lo que sucederá cuando el formulario sea válido.
            alert('Formulario enviado correctamente');
        }
    });

    function validarContrasena(contrasena) {
        const criterios = [
            { regex: /.{8,}/, mensaje: "8 caracteres como mínimo" },
            { regex: /[a-z]/, mensaje: "1 letra minúscula" },
            { regex: /[A-Z]/, mensaje: "1 letra mayúscula" },
            { regex: /\d/, mensaje: "1 número" }
        ];
        const errores = [];

        criterios.forEach(criterio => {
            if (!criterio.regex.test(contrasena)) {
                errores.push(criterio.mensaje);
            }
        });

        if (errores.length === 0) {
            return true; // La contraseña es fuerte
        } else {
            // Construimos un mensaje indicando los requisitos que faltan
            return "La contraseña es débil, falta: " + errores.join(", ") + ".";
        }
    }
});
