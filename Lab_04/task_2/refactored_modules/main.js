(function(Store) {
    console.log("Приложение запущено...");

    // 1. Загружаем товары
    Store.setProducts([
        { id: 1, name: "Ноутбук", price: 1000 },
        { id: 2, name: "Мышь", price: 50 }
    ]);

    // 2. Добавляем в корзину
    Store.addToCart(1, 1);
    Store.addToCart(2, 2);

    // 3. Оформляем заказ
    const order = Store.processOrder();
    console.log("Ваш заказ готов:", order);

})(MyApp.Modules.Store);