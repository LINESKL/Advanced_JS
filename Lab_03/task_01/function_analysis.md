<pre>
```javascript

// Универсальная обертка для выполнения API запросов с обработкой ошибок
async function apiRequest(endpoint, options = {}) {
    const BASE_URL = 'https://api.example.com';
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            },

            // Проверка на HTTP ошибки (4хх и 5хх статусы), так как fetch их не выбрасывает сам

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (error) }
        console.error('API Request Error:', error.message);
        throw error;
    }
}
```
</pre>