export function renderHistory(historyArray) {
    const container = document.getElementById('history-list');
    
    if (!historyArray || historyArray.length === 0) {
        container.innerHTML = '<li style="color: #a0aec0; font-style: italic;">История пуста...</li>';
        console.log('History is empty.');
        return;
    }
    
    // Показываем последние 10 записей в обратном порядке
    const recentHistory = historyArray.slice(-10).reverse();
    container.innerHTML = recentHistory.map((item, index) => {
        const itemNumber = historyArray.length - index;
        return `<li><span style="color: #667eea; font-weight: bold;">#${itemNumber}:</span> ${item}</li>`;
    }).join('');
    
    console.log('History rendered with', historyArray.length, 'items.');
}