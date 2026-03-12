# Лабораторная работа #9
## Поведенческие паттерны проектирования

### Описание
Изучение и практическое применение поведенческих паттернов проектирования (Behavioral Design Patterns) в JavaScript. Реализация паттернов Observer/Pub-Sub и Command/Mediator для управления коммуникацией между компонентами системы.
 
### Задачи

**Задача 1: Observer & Pub/Sub**
- Реализация EventBus как централизованного посредника событий
- Создание NewsPublisher для публикации новостей по категориям
- Реализация подписчиков: EmailNotifier, PushNotifier, DashboardWidget
- Поддержка одноразовых подписок и ручной отписки

**Задача 2: Command & Mediator**
- Реализация паттерна Command для управления умным домом
- Создание CommandManager с поддержкой undo/redo
- Реализация HomeMediator для координации устройств
- Автоматизация через правила взаимодействия устройств

### Структура проекта

```
Lab_09/
├── README.md
├── AI_REPORT.md
├── task_1/
│   ├── index.html
│   ├── pubsub/
│   │   └── EventBus.js          # Централизованная шина событий
│   ├── publisher/
│   │   └── NewsPublisher.js     # Публикатор новостей
│   └── subscribers/
│       ├── EmailNotifier.js
│       ├── PushNotifier.js
│       └── DashboardWidget.js
└── task_2/
    ├── index.html
    ├── commands/
    │   ├── Command.js           # Базовый интерфейс команды
    │   ├── LightCommands.js     # Команды управления светом
    │   └── CommandManager.js    # Менеджер с undo/redo
    ├── devices/
    │   ├── Device.js
    │   ├── Light.js
    │   ├── Thermostat.js
    │   └── SecuritySystem.js
    └── mediator/
        └── HomeMediator.js      # Медиатор умного дома
```

### Ключевые концепции

**Observer / Pub-Sub:**
- Слабая связность между издателями и подписчиками
- Централизованная шина событий (EventBus) через Map
- Поддержка `subscribe`, `subscribeOnce`, `publish`, `unsubscribe`

**Command / Mediator:**
- Инкапсуляция операции в объект команды
- История выполненных команд для поддержки undo/redo
- HomeMediator координирует взаимодействие устройств без прямой связи

---

*Выполнил: Нурканат Алиар | Дата: 2026-03-12*
