MyApp.Utils = (function() {
    return {
        // Универсальная функция форматирования вместо 4-х старых
        formatCurrency: (amount, symbol = "$") => {
            return `${symbol} ${amount.toFixed(2)}`;
        },
        // Валидация
        isValid: (value) => value !== null && value !== undefined && value !== ""
    };
})();