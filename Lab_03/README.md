<div align="center">

# Lab 3 — JavaScript Design Patterns

### Structuring and Writing Patterns

</div>

## Описание

Лабораторная работа посвящена глубокому изучению паттернов проектирования в JavaScript. Включает два практических задания: документирование пользовательской функции по стандартам GoF и исследование классического паттерна Module с его эволюцией до ES6 модулей.

## Цели обучения

- Понимание структуры и документирования паттернов проектирования
- Изучение стандартов описания паттернов (Gang of Four)
- Освоение паттерна Module и его вариаций
- Работа с замыканиями для создания приватности
- Понимание эволюции модульности в JavaScript
- Сравнительный анализ классических и современных подходов
- Формирование навыков профессионального документирования кода

## Задания

### Task 1 — Pattern Structure Documentation

**Директория:** `task_01/`

Документирование утилитарной функции по формальным стандартам, описанным в главе 3 книги Эдди Османи "Learning JavaScript Design Patterns". Выбрана функция **API Fetch Wrapper** — обертка для сетевых запросов.

#### Компоненты задания:

**function_analysis.md**
- Первичный анализ выбранной функции
- Описание решаемых проблем
- Контекст использования в реальных проектах
- Определение целевой аудитории паттерна

**pattern_documentation.md**
- Полное формальное описание паттерна по структуре GoF
- Разделы: Name, Context, Problem, Solution, Design, Implementation, Consequences
- Детальное объяснение каждого аспекта паттерна
- Примеры использования и альтернативные подходы

**pattern_example.js**
- Исполняемый код функции на JavaScript (ES6+)
- Комментарии к ключевым участкам кода
- Демонстрация обработки ошибок
- Пример использования в реальном сценарии

**quality_assessment.md**
- Самопроверка документации на соответствие критериям "Well-Written Patterns"
- Анализ читабельности и понятности
- Оценка полноты описания
- Рефлексия процесса документирования

**Ключевые концепции:**
- Формальная структура документации паттернов
- Разделение ответственности в коде
- Обработка HTTP статусов в Fetch API
- Централизация конфигурации запросов
- Унификация обработки ошибок

---

### Task 2 — Module Pattern Documentation (GoF Style)

**Директория:** `task_02/`

Глубокое изучение и формальное документирование паттерна **Module (Модуль)**. Исследование истории возникновения, эволюции и современных реализаций этого фундаментального для JavaScript паттерна.

#### Компоненты задания:

**module_pattern_research.md**
- История возникновения паттерна Module
- Связь с другими паттернами проектирования
- Использование в популярных библиотеках (jQuery, YUI)
- Роль в развитии модульности JavaScript
- Влияние на современные стандарты

**module_pattern_gof.md**
- Полная спецификация паттерна в стиле Gang of Four
- Структурированное описание: Context, Problem, Solution, Design, Implementation
- Анализ последствий (Consequences)
- Преимущества и недостатки подхода
- Сценарии применения

**module_examples.js**
- Classic Module Pattern (IIFE)
- Revealing Module Pattern
- Modern ES6 Module (имитация приватных полей)
- Сравнение синтаксиса и возможностей
- Практические примеры использования

**pattern_comparison.md**
- Сравнение различных подходов к модульности
- Эволюция паттерна: от IIFE до ES6 modules
- Таблица сравнения характеристик
- Рекомендации по выбору подхода
- Современные best practices

**Ключевые концепции:**
- Инкапсуляция через замыкания (closures)
- IIFE для создания приватной области видимости
- Public и Private интерфейсы модуля
- Revealing Module Pattern
- ES6 модули и import/export
- Приватные поля в классах (#field)

## Структура проекта

```
Lab_03/
├── AI_REPORT.md             # Отчет об использовании AI
├── task_01/                 # Pattern Documentation
│   ├── function_analysis.md          # Анализ функции
│   ├── pattern_documentation.md      # GoF документация
│   ├── pattern_example.js            # Код реализации
│   ├── quality_assessment.md         # Оценка качества
│   └── README.md                     # Описание задания
│
└── task_02/                 # Module Pattern
    ├── module_pattern_research.md    # Исторический обзор
    ├── module_pattern_gof.md         # GoF спецификация
    ├── module_examples.js            # Примеры реализаций
    ├── pattern_comparison.md         # Сравнительный анализ
    └── README.md                     # Описание задания
```

## Технологический стек

- **JavaScript ES6+** — современный синтаксис
- **Markdown** — документирование паттернов
- **Node.js** — запуск примеров кода
- **GoF Standards** — формат документации

## Ключевые концепции

### 1. Структура документации паттерна (GoF)

```markdown
1. Pattern Name — Уникальное имя
2. Context — Когда применять
3. Problem — Решаемая проблема
4. Solution — Как решается проблема
5. Design — Архитектурное решение
6. Implementation — Детали реализации
7. Consequences — Последствия применения
```

### 2. Classic Module Pattern (IIFE)

```javascript
const Calculator = (function() {
  // Приватная переменная
  let result = 0;
  
  // Приватная функция
  function log(message) {
    console.log(`[Calculator]: ${message}`);
  }
  
  // Публичный API
  return {
    add(value) {
      result += value;
      log(`Added ${value}`);
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

Calculator.add(5).add(10);
console.log(Calculator.getResult()); // 15
```

### 3. Revealing Module Pattern

```javascript
const UserModule = (function() {
  // Приватное состояние
  let users = [];
  
  // Приватные методы
  function validateUser(user) {
    return user.name && user.email;
  }
  
  // Публичные методы
  function addUser(user) {
    if (validateUser(user)) {
      users.push(user);
      return true;
    }
    return false;
  }
  
  function getUsers() {
    return [...users];
  }
  
  // Открываем только необходимое
  return {
    addUser,
    getUsers
  };
})();
```

### 4. Modern ES6 Module

```javascript
// userModule.js
let users = [];

function validateUser(user) {
  return user.name && user.email;
}

export function addUser(user) {
  if (validateUser(user)) {
    users.push(user);
    return true;
  }
  return false;
}

export function getUsers() {
  return [...users];
}

// app.js
import { addUser, getUsers } from './userModule.js';
```

### 5. API Fetch Wrapper Pattern

```javascript
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
      }
    });
    
    // Проверка HTTP статуса
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Использование
try {
  const data = await apiRequest('/users/1');
  console.log(data);
} catch (error) {
  console.error('Failed to fetch user:', error);
}
```

## Критерии "Well-Written Pattern"

1. **Понятность** — Паттерн решает конкретную проблему
2. **Структурированность** — Следование формату GoF
3. **Обобщенность** — Применимость к классу проблем
4. **Доказанность** — Проверен практикой
5. **Отношения** — Связь с другими паттернами

## Методология работы

1. **Выбор паттерна** — Анализ проблемной области
2. **Исследование** — Изучение истории и контекста
3. **Документирование** — Следование структуре GoF
4. **Реализация** — Написание примеров кода
5. **Оценка** — Проверка соответствия критериям
6. **Рефлексия** — Анализ процесса обучения

## Полезные ресурсы

- [Learning JavaScript Design Patterns — Addy Osmani](https://www.patterns.dev/posts/classic-design-patterns/)
- [Gang of Four Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns)
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript Module Pattern In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
- [ES6 Modules](https://exploringjs.com/es6/ch_modules.html)

## Запуск примеров

```bash
# Task 1 - API Wrapper
cd Lab_03/task_01
node pattern_example.js

# Task 2 - Module Pattern
cd Lab_03/task_02
node module_examples.js
```

## Основные выводы

В ходе выполнения лабораторной работы было изучено:

1. **Формальное документирование** паттернов по стандартам Gang of Four
2. **Паттерн Module** — фундаментальный паттерн для JavaScript
3. **Замыкания** как механизм создания приватности
4. **Эволюция модульности** от IIFE до ES6 modules
5. **Критическое мышление** при выборе паттернов проектирования

Понимание классического паттерна Module остается критически важным для понимания работы области видимости и архитектуры JavaScript-приложений, даже в эпоху ES6 модулей.

---

<div align="center">

Выполнил: Нурканат Алиар  
Дата: 2026-01-29

</div>
