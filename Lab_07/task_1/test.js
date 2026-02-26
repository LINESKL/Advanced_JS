// test.js
import ConfigManager from "./singleton.js";
import moduleConfig from "./config.js";

console.log("=== Тестирование Классового Singleton ===");

const instance1 = ConfigManager.getInstance();
const instance2 = ConfigManager.getInstance();
const instance3 = new ConfigManager(); // Проверка вызова через new

// 1. Проверяем, что getInstance() возвращает тот же самый инстанс
console.log("Same instance (getInstance):", instance1 === instance2); // должно быть true

// 2. Проверяем, что ключевое слово new возвращает тот же самый инстанс
console.log("Same instance (new keyword):", instance1 === instance3); // должно быть true

// 3. Проверяем, что данные сохраняются между "разными" инстансами
instance1.set("appName", "MyApp");
console.log("Из instance1:", instance1.get("appName")); // "MyApp"
console.log("Из instance2:", instance2.get("appName")); // "MyApp"
console.log("Из instance3:", instance3.get("appName")); // "MyApp"

console.log("\n=== Тестирование Модульного Singleton ===");
moduleConfig.set("theme", "dark");
console.log("Theme из модуля:", moduleConfig.get("theme")); // "dark"