// script.js

// Función principal que corre al iniciar la página
window.onload = function() {
    detectarUsuario();
};

function detectarUsuario() {
    // 1. Detectar IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-display').textContent = 'IP: ' + data.ip;
        })
        .catch(error => {
            document.getElementById('ip-display').textContent = 'IP: No detectada';
        });

    // 2. Detectar Dispositivo (Modelo del teléfono)
    const userAgent = navigator.userAgent;
    let telefono = "Desconocido";
    
    // Lógica simple para detectar iPhone
    if (userAgent.includes("iPhone")) {
        telefono = "iPhone";
    } else if (userAgent.includes("Android")) {
        telefono = "Android";
    } else if (userAgent.includes("Windows")) {
        telefono = "Windows PC";
    }
    
    document.getElementById('datos-dispositivo').textContent = '📱 Teléfono/PC: ' + telefono;

    // 3. Detectar Ubicación (Ciudad y País)
    // Nota: La ubicación exacta requiere una API de pago o backend
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            let ubicacion = `${data.city}, ${data.country_name}`;
            document.getElementById('ubicacion-display').textContent = '📍 Ubicación: ' + ubicacion;
        })
        .catch(error => {
            document.getElementById('ubicacion-display').textContent = '📍 Ubicación: No detectada';
        });
}
