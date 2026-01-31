<div align="center">

# Lab 1 — React Context & Design Patterns

### Pattern Recognition & Provider Pattern

</div>

## Описание

Лабораторная работа посвящена изучению распознавания паттернов проектирования и практической реализации **Provider Pattern** в React с использованием Context API. Включает теоретическую часть о правиле трёх и практическое применение паттерна провайдера.

## Цели обучения

- Понимание концепции распознавания паттернов проектирования
- Освоение "Правила трёх" (Rule of Three)
- Изучение Provider Pattern в React
- Работа с React Context API
- Управление глобальным состоянием приложения
- Создание переиспользуемых провайдеров
- Композиция компонентов с контекстом

## Задания

### Task 1 — The Pattern Audit (Теоретическая часть)

**Директория:** `task_01/`

Изучение теоретических основ распознавания паттернов проектирования и применение "Правила трёх" для определения необходимости рефакторинга кода.

#### Основные концепции:

**1. Правило трёх (Rule of Three)**
- Принцип определения момента для рефакторинга
- Если код повторяется три раза, пора создавать абстракцию
- Баланс между DRY и преждевременной оптимизацией

**2. Распознавание паттернов**
- Анализ повторяющегося кода
- Выявление общих структур и шаблонов
- Определение подходящих паттернов проектирования

**3. Категории паттернов**
- Creational (Порождающие)
- Structural (Структурные)
- Behavioral (Поведенческие)

**Ключевые вопросы:**
- Когда применять паттерны проектирования?
- Как избежать over-engineering?
- Как распознать необходимость рефакторинга?

---

### Task 2 — Provider Pattern Implementation

**Директория:** `task_02/`

Практическая реализация Provider Pattern в React приложении с использованием Context API для управления пользовательским состоянием.

#### Компоненты:

**UserContext** (`src/components/UserContext.jsx`)
- Создание контекста для хранения пользовательских данных
- Определение структуры данных контекста

**UserProvider** (`src/components/UserProvider.jsx`)
- Компонент-провайдер для управления состоянием пользователя
- Методы для обновления данных пользователя
- Предоставление значений контекста дочерним компонентам

**Dashboard** (`src/components/Dashboard.jsx`)
- Главный компонент панели управления
- Композиция Header и UserMenu
- Потребление контекста пользователя

**Header** (`src/components/Header.jsx`)
- Компонент шапки приложения
- Отображение информации о текущем пользователе
- Использование useContext для доступа к данным

**UserMenu** (`src/components/UserMenu.jsx`)
- Компонент меню пользователя
- Взаимодействие с провайдером для изменения данных
- Демонстрация обновления контекста

**Ключевые концепции:**
- React Context API
- Provider Pattern
- Prop Drilling решение
- useContext Hook
- Глобальное состояние
- Композиция компонентов

**Запуск:**
```bash
cd Lab_01/task_02
pnpm install
pnpm dev
```

## Структура проекта

```
Lab_01/
├── AI_REPORT.md             # Отчет об использовании AI
├── task_01/                 # Pattern Recognition
│   └── task_1.docx         # Теоретические материалы
│
└── task_02/                 # Provider Pattern App
    ├── src/
    │   ├── components/
    │   │   ├── UserContext.jsx     # Контекст пользователя
    │   │   ├── UserProvider.jsx    # Провайдер состояния
    │   │   ├── Dashboard.jsx       # Панель управления
    │   │   ├── Header.jsx          # Шапка приложения
    │   │   └── UserMenu.jsx        # Меню пользователя
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── public/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

## Технологический стек

- **React** — библиотека для создания UI
- **JavaScript (JSX)** — язык программирования
- **Vite** — быстрый инструмент сборки
- **Context API** — управление состоянием
- **ESLint** — контроль качества кода
- **pnpm** — менеджер пакетов

## Ключевые концепции

### 1. Создание Context

```jsx
// UserContext.jsx
import { createContext } from 'react';

export const UserContext = createContext(null);
```

### 2. Provider Component

```jsx
// UserProvider.jsx
import { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  });

  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const value = {
    user,
    updateUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
```

### 3. Использование Context с useContext

```jsx
// Header.jsx
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header>
      <h1>Welcome, {user.name}!</h1>
      <p>{user.email}</p>
    </header>
  );
};
```

### 4. Обновление Context

```jsx
// UserMenu.jsx
import { useContext } from 'react';
import { UserContext } from './UserContext';

const UserMenu = () => {
  const { user, updateUser } = useContext(UserContext);

  const handleLogout = () => {
    updateUser({ name: 'Guest', email: '', role: 'guest' });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
```

### 5. App Structure с Provider

```jsx
// App.jsx
import { UserProvider } from './components/UserProvider';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Dashboard />
      </div>
    </UserProvider>
  );
}

export default App;
```

## Provider Pattern - Преимущества

**Избавление от Prop Drilling**
- Не нужно передавать props через множество уровней компонентов

**Централизованное управление состоянием**
- Единая точка хранения глобальных данных

**Переиспользуемость**
- Любой компонент может легко получить доступ к контексту

**Упрощение архитектуры**
- Чистая структура компонентов без лишних props

**Разделение ответственности**
- Логика состояния отделена от UI компонентов

## Правило трёх (Rule of Three)

### Принцип:
1. **Первый раз** — пишите код как есть
2. **Второй раз** — дублируйте с осторожностью
3. **Третий раз** — рефакторите и создавайте абстракцию

### Применение в React:
```jsx
// Плохо - повторение
<div className="card">
  <h2>User 1</h2>
</div>
<div className="card">
  <h2>User 2</h2>
</div>
<div className="card">
  <h2>User 3</h2>
</div>

// Хорошо - компонент после третьего повторения
const Card = ({ title }) => (
  <div className="card">
    <h2>{title}</h2>
  </div>
);

<Card title="User 1" />
<Card title="User 2" />
<Card title="User 3" />
```

## Распространённые паттерны в React

1. **Provider Pattern** — управление глобальным состоянием
2. **Compound Components** — композиция связанных компонентов
3. **Higher-Order Components (HOC)** — переиспользование логики
4. **Render Props** — передача функций рендеринга
5. **Custom Hooks** — извлечение логики состояния
6. **Container/Presentational** — разделение логики и UI

## Когда использовать Provider Pattern?

**Используйте когда:**
- Данные нужны многим компонентам на разных уровнях
- Есть глобальное состояние (тема, язык, аутентификация)
- Prop drilling становится проблемой
- Нужна централизация управления состоянием

**Не используйте когда:**
- Данные нужны только двум-трём соседним компонентам
- Состояние чисто локальное
- Производительность критична (Context перерендеривает всех подписчиков)

## Полезные ресурсы

- [React Context API](https://react.dev/reference/react/useContext)
- [Provider Pattern](https://www.patterns.dev/posts/provider-pattern/)
- [React Design Patterns](https://www.patterns.dev/posts/react-patterns/)
- [When to use Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Rule of Three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
- [Learning JavaScript Design Patterns](https://www.patterns.dev/)

## Типичные ошибки и решения

### 1. Context в каждом компоненте
```jsx
// Плохо
const { user } = useContext(UserContext);

// Хорошо - создайте custom hook
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
```

### 2. Слишком много значений в одном контексте
```jsx
// Плохо - один большой контекст
<AppContext.Provider value={{ user, theme, settings, ... }}>

// Хорошо - разделите на несколько контекстов
<UserProvider>
  <ThemeProvider>
    <SettingsProvider>
      ...
    </SettingsProvider>
  </ThemeProvider>
</UserProvider>
```

### 3. Производительность
```jsx
// Плохо - создание нового объекта на каждом рендере
<UserContext.Provider value={{ user, updateUser }}>

// Хорошо - мемоизация значения
const value = useMemo(() => ({ user, updateUser }), [user]);
<UserContext.Provider value={value}>
```

---

<div align="center">

Выполнил: Нурканат Алиар  
Дата: 2026-01-28

</div>
