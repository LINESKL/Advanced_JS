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