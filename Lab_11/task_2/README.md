<div align="center">

# Lab 11.2: Async Workflows & Cancellation

</div>

## Обзор

Реализация процессов управления данными с использованием современных концепций отмены запросов и конвейеров (Pipelines) для пошаговой обработки.

## Файлы

- `index.html` — демо-панель для запуска асинхронных процессов и управления ими.
- `CancellableFetcher.js` — обертка над запросами с использованием `AbortController`.
- `DataFetcher.js` — модуль для периодического получения обновлений (polling).
- `Pipeline.js` — реализация цепочек пошаговой обработки (загрузка -> трансформация -> фильтрация).

## Ключевые механизмы

### 1. Request Cancellation (AbortController)
Защита от Race Conditions. При множественных нажатиях на кнопку "Загрузить" предыдущие, все еще выполняющиеся запросы немедленно отменяются, что предотвращает конфликты данных.

### 2. Async Pipeline
Поток выполнения в виде цепочки шагов. Каждый шаг может быть асинхронным (Promise). Данные передаются от этапа к этапу, что позволяет гибко комбинировать логику.

### 3. Data Fetching
Реализация надежного механизма получения данных с поддержкой автоматического обновления и корректного завершения при уничтожении компонента UI.

## Примеры использования

```javascript
// Отменяемый запрос
const fetcher = new CancellableFetcher();
try {
  const result = await fetcher.fetch('/api/heavy-data');
} catch (err) {
  if (err.name === 'AbortError') console.log('Запрос отменен');
}

// Конвейер обработки
const pipe = new Pipeline()
  .step(async (data) => await transform(data))
  .step((data) => data.filter(item => item.active));
const finalData = await pipe.execute(initialData);
```

---
*Выполнил: Нурканат Алиар | Дата: 2026-03-26*
