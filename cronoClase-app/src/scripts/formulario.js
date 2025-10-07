(function () {
  'use strict';

  // URL por defecto para pruebas. Cambia esto por tu endpoint real.
  const DEFAULT_API_URL = 'https://68df1237898434f41356ae93.mockapi.io/formulario';

  // Intenta leer una URL de API desde: 1) atributo data-api-url en el formulario, 2) variable global window.API_URL, 3) valor por defecto
  function getApiUrl(formEl) {
    if (formEl && formEl.dataset && formEl.dataset.apiUrl) return formEl.dataset.apiUrl;
    if (window && window.API_URL) return window.API_URL;
    return DEFAULT_API_URL;
  }

  // Muestra un mensaje en el elemento con id 'mensajeRegistro'
  function showMessage(text, isSuccess = true) {
    const msgEl = document.getElementById('mensajeRegistro');
    if (!msgEl) return;
    msgEl.style.display = 'block';
    msgEl.classList.remove('text-success', 'text-danger');
    msgEl.classList.add(isSuccess ? 'text-success' : 'text-danger');
    msgEl.textContent = text;
  }

  // Oculta el mensaje
  function hideMessage() {
    const msgEl = document.getElementById('mensajeRegistro');
    if (!msgEl) return;
    msgEl.style.display = 'none';
    msgEl.textContent = '';
  }

//   Serializa los campos del formulario a un objeto
  function collectFormData(formEl) {
    return {
      nombreCompleto: (formEl.nombreCompleto && formEl.nombreCompleto.value) || '',
      cedula: (formEl.cedula && formEl.cedula.value) || '',
      telefono: (formEl.telefono && formEl.telefono.value) || '',
      fechaNacimiento: (formEl.fechaNacimiento && formEl.fechaNacimiento.value) || '',
      genero: (formEl.genero && formEl.genero.value) || '',
      rol: (formEl.rol && formEl.rol.value) || '',
      correo: (formEl.emailRegistro && formEl.emailRegistro.value) || '',
      contrasena: (formEl.passwordRegistro && formEl.passwordRegistro.value) || '',
      confirmarContrasena: (formEl.confirmarPassword && formEl.confirmarPassword.value) || ''
    };
  }

  // Deshabilita/rehabilita el botón submit
  function setSubmitting(formEl, isSubmitting) {
    const btn = formEl.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.disabled = isSubmitting;
    btn.textContent = isSubmitting ? 'Enviando...' : 'Registrarse';
  }

  function init() {
    const form = document.getElementById('formRegistro');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMessage();

    
      // Construir payload (ajusta las llaves según la API real)
      const payload = collectFormData(form);

      const apiUrl = getApiUrl(form);
      setSubmitting(form, true);

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(async (res) => {
          // jsonplaceholder responde 201 para posts; otras APIs pueden variar
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            const errMsg = (data && data.message) || `Error ${res.status} al registrar`;
            throw new Error(errMsg);
          }
          return data;
        })
        .then((data) => {
          showMessage('Te has registrado exitosamente.', true);
          // Cerrar modal después de 1.5s y resetear formulario
          const modalEl = document.getElementById('modalRegistro');
          try {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            setTimeout(() => {
              modal.hide();
              form.reset();
              hideMessage();
            }, 1500);
          } catch (err) {
            // Si bootstrap no está disponible, solo resetear
            setTimeout(() => {
              form.reset();
              hideMessage();
            }, 1500);
          }
          // Para depuración: registra la respuesta de la API
          console.log('Registro API respuesta:', data);
        })
        .catch((err) => {
          console.error('Error al enviar datos:', err);
          showMessage(`No se pudo registrar: ${err.message}`, false);
        })
        .finally(() => setSubmitting(form, false));
    });
  }

  // Inicializa cuando DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


