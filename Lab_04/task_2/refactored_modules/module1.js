MyApp.Modules.Store = (function(Config, Utils) {
    // ПРИВАТНЫЕ СОСТОЯНИЯ (теперь их нельзя сломать из консоли)
    let _products = [];
    let _cart = [];
    let _user = null;

    // ПРИВАТНЫЕ МЕТОДЫ (Вспомогательные)
    const _calculateSubtotal = () => _cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // ПУБЛИЧНОЕ API
    return {
        // Управление товарами
        setProducts: (items) => { _products = items; },
        
        // Логика корзины
        addToCart: (productId, quantity) => {
            const product = _products.find(p => p.id === productId);
            if (product) {
                _cart.push({ ...product, quantity });
                console.log(`Добавлено: ${product.name}`);
            }
        },

        // Расчет итогов (используем конфиг и утилиты)
        processOrder: () => {
            const subtotal = _calculateSubtotal();
            const tax = subtotal * Config.get('taxRate');
            const total = subtotal + tax + Config.get('shippingCost');
            
            return {
                total: Utils.formatCurrency(total, Config.get('currency')),
                date: new Date().toISOString()
            };
        },

        // Управление пользователем
        setUser: (userData) => { _user = userData; }
    };
})(MyApp.Config, MyApp.Utils); // Внедрение зависимостей