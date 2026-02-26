import { NotificationFactory } from "./NotificationFactory.js";

function sendNotification(type, options, message) {
  try {
    // Делегируем создание объекта Фабрике
    const notification = NotificationFactory.create(type, options);
    
    // Вызываем общий интерфейс
    return notification.send(message);
  } catch (error) {
    // Обработка ошибок (например, если передали тип "telegram")
    console.error("Failed to send notification:", error.message);
    return { success: false, error: error.message };
  }
}

// Демонстрация работы
console.log("Доступные типы:", NotificationFactory.getSupportedTypes());
console.log("--------------------------------------------------");

sendNotification(
  "email", 
  { to: "user@example.com", subject: "Hello" }, 
  "Welcome to our service!"
);
console.log("--------------------------------------------------");

sendNotification(
  "sms", 
  { to: "+1234567890" }, 
  "Your verification code is 123456"
);
console.log("--------------------------------------------------");

sendNotification(
  "push", 
  { deviceToken: "abc123_xyz", title: "New Alert" }, 
  "You have a new friend request"
);
console.log("--------------------------------------------------");

// Проверка обработки ошибки
sendNotification("telegram", { to: "@username" }, "Hello Telegram");