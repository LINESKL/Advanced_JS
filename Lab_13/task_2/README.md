# Task 2 — Custom React Hooks

### useApi, useFetch, useDebounce, useLocalStorage

## Описание

Реализация набора кастомных React-хуков для решения типичных задач: работа с API, debounce-задержки, localStorage и управление сетевыми запросами с кэшированием.

## Ключевые аспекты

- **useApi** — универсальный хук для вызова асинхронных функций с abort-контролем, состояниями loading/error/data и методом `refetch`
- **useFetch** — HTTP-клиент с автоматическим кэшированием (Map), AbortController для отмены устаревших запросов и защитой от race conditions
- **useDebounce** — задержка обновления значения для оптимизации частых обновлений (например, при вводе в поле поиска)
- **useLocalStorage** — реактивная обёртка над localStorage с Two-Way Binding и обработкой ошибок

## Структура

```
task_2/
├── src/
│   ├── hooks/
│   │   ├── useApi.ts          # Универсальный API-хук с abort
│   │   ├── useFetch.ts        # Fetch с кэшированием
│   │   ├── useDebounce.ts     # Debounce-хук
│   │   └── useLocalStorage.ts # Реактивный localStorage
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## Результаты

1. Понимание паттерна кастомных хуков для инкапсуляции повторяющейся логики
2. Навык работы с AbortController для предотвращения утечек ресурсов
3. Практический опыт кэширования данных на клиенте
4. Создание реактивных обёрток над браузерными API

---

**Выполнил:** Нурканат Алиар
**Курс:** Advanced JavaScript
**Дата:** 2026-04-09
