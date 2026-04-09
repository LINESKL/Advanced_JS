# Task 1 — Higher-Order Components & Context API

### Themed Components with HOC Pattern

## Описание

Реализация системы темизации React-компонентов с использованием паттерна Higher-Order Component (HOC) и React Context API. Созданы переиспользуемые стилизованные компоненты, которые автоматически получают доступ к текущей теме через обёртку `withTheme`.

## Ключевые аспекты

- **Context API** — централизованное хранение состояния темы (`ThemeProvider`, `useTheme`)
- **Higher-Order Component** — паттерн `withTheme` для инъекции темы в любые компоненты
- **Темизация** — две темы (light/dark) с единой структурой токенов (цвета, отступы, типографика, радиусы)
- **Компоненты** — `ThemedButton` (с вариантами primary/secondary) и `ThemedCard` (с опцией elevated тени)

## Структура

```
task_1/
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx      # Провайдер темы и хук useTheme
│   ├── hocs/
│   │   └── withTheme.jsx         # HOC для инъекции темы
│   ├── components/
│   │   └── ThemedComponents.jsx  # ThemedButton, ThemedCard
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## Результаты

1. Понимание паттерна HOC и его применения для повторного использования логики
2. Навык работы с React Context для глобального состояния
3. Создание дизайн-системы на основе токенов

---

**Выполнил:** Нурканат Алиар
**Курс:** Advanced JavaScript
**Дата:** 2026-04-09
