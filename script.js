// script.js
async function extraerDatos() {
    const url = document.getElementById('url').value;
    const resultadosDiv = document.getElementById('resultados');
    
    resultadosDiv.innerHTML = '<h3>Extrayendo datos...</h3>';
    
    // Obtener IP
    const ip = await obtenerIP();
    
    // Obtener datos del dispositivo
    const datosDispositivo = await obtenerDatosDispositivo();
    
    // Obtener ubicación
    obtenerUbicacion();
    
    // Mostrar resultados
    mostrarResultados({
        url: url,
        ip: ip,
        datosDispositivo: datosDispositivo,
        ubicacion: "NO DETECTADA"
    });
}

async function obtenerIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener IP:', error);
        return "NO DETECTADA";
    }
}

async function obtenerDatosDispositivo() {
    const datosDispositivo = {
        ip: await obtenerIP(),
        userAgent: navigator.userAgent,
        pantalla: {
            ancho: window.screen.width,
            alto: window.screen.height,
            colorProfundidad: window.screen.colorDepth
        },
        idioma: organizacion: navigator.language,
        plataforma: navigator.platform,
        memoria: navigator.deviceMemory,
        núcleos: navigator.hardwareConcurrency
    };
    
    return datosDispositivo;
}

function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Latitud:', position.coords.latitude);
                console.log('Longitud:', position.coords.longitude);
            },
            (error) => {
                console.error('Error de geolocalización:', error);
            }
        );
    }
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = `<h3>Resultados de la extracción:</h3>`;
    html += `<div><strong>URL:</strong> ${datos.url}</div>`;
    html += `<div><strong>IP:</strong> ${datos.ip}</div>`;
    html += `<div><strong>Dispositivo:</strong></div>`;
    html += `<pre>${JSON.stringify(datos.datosDispositivo, null, 2)}</pre>`;
    html += `<div><strong>Ubicación:</strong> ${datos.ubicacion}</div>`;
    
    resultadosDiv.innerHTML = html;
}
