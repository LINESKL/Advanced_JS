# Документация паттерна: API Fetch Wrapper 

**Pattern Name:** API Fetch Wrapper
**Description:** Паттерн для централизации сетевых запросов, обеспечивающий единообразную обработку ответов и ошибок.

### Context Outline
Используется в клиентских JavaScript-приложениях, работающих с RESTful API, где требуется повторяющаяся логика настройки заголовков, базовых URL и обработки HTTP-статусов.

### Problem Statement
Стандартный `fetch` API не обрабатывает HTTP ошибки (4xx, 5xx) по умолчанию и требует дублирования кода для настройки запросов и обработки ответов. Это приводит к увеличению количества ошибок и усложняет поддержку кода.

### Solution
Создание универсальной функции-обертки `apiRequest`, которая:
1. Инапсулирует базовую конфигурацию (URL, headers).
2. Автоматически проверяет статус ответа и выбрасывает ошибки для неуспешных ответов.
3. Парсит JSON-ответы и возвращает их вызывающему коду.
4. Логирует ошибки в консоль для упрощения отладки.

### Design
Паттерн спроектирован как асинхронная утилита. Она принимает относительный путь (endpoint) и объект настроек, дополняя их стандартными параметрами перед отправкой.

### Implementation
Реализовано с использованием `async/await` и встроенного `fetch` API. Для обработки ошибок используется конструкция `try...catch`.

### Example Code

```javascript
// Универсальная обертка для выполнения API запросов с обработкой ошибок
async function apiRequest(endpoint, options = {}) {
    const BASE_URL = 'https://api.example.com';
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    try {
        // 1. Выполняем запрос
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        }); // Здесь закрываем fetch

        // 2. Проверка на HTTP ошибки (4xx и 5xx), так как fetch сам не кидает catch на них
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error: ${response.status}`);
        }

        // 3. Возвращаем данные
        return await response.json();

    } catch (error) { // Исправлена скобка здесь
        console.error('API Request Error:', error.message);
        throw error; // Пробрасываем ошибку дальше
    }
}
```

### Consequences
* **Плюсы:** Сокращение дублирования кода (DRY), упрощение отладки, единый формат обработки ошибок.
* **Минусы:** Дополнительный уровень абстракции; требует доработки, если API возвращает не JSON, в другие форматы.