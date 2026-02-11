MyApp.Config = (function() {
    // Приватные настройки (инкапсуляция)
    const _settings = {
        taxRate: 0.08,
        shippingCost: 10,
        currency: "USD",
        theme: "light",
        language: "ru"
    };

    return {
        get: (key) => _settings[key],
        set: (key, value) => { _settings[key] = value; }
    };
})();