export function renderHistory(historyArray) {
    const container = document.getElementById('history-list');
    container.innerHTML = historyArray.map(item => `<li>${item}</li>`).join('');
    console.log('History rendered with', historyArray.length, 'items.');
}