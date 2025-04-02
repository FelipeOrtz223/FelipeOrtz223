document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validar campos vacíos
    if(username === '' || password === '') {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Credenciales válidas (esto es solo para ejemplo)
    const validUsername = "Ucompensar";
    const validPassword = "Ucompensar";
    
    // Verificar credenciales
    if(username === validUsername && password === validPassword) {
        // Redireccionar a la página de bienvenida
        window.location.href = "idioms.html";
    } else {
        alert('Usuario o contraseña incorrectos');
        // Limpiar campo de contraseña
        document.getElementById('password').value = '';
    }
});