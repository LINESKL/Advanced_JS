export function updateDisplay(value) {
    const display = document.getElementById('display');
    if (display) display.innerText = value;
}

export function logToConsole(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}