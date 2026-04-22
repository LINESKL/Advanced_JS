# Task 2 — Service Workers & PWA

## Описание

Реализация Progressive Web App (PWA) с использованием Service Workers для кэширования ресурсов, работы в offline-режиме и push-уведомлений.

## Функциональность

### 1. Service Worker Lifecycle
- Регистрация и активация Service Worker
- Обновление и управление версиями кэша
- Мониторинг состояния воркера

### 2. Caching Strategies
- **Cache First**: статические ресурсы (HTML, CSS, JS)
- **Network First with Cache Fallback**: API запросы
- **Runtime Caching**: динамическое кэширование изображений и API

### 3. Offline Support
- Работа приложения без интернета
- Очередь offline-действий с синхронизацией
- Автоматическое определение статуса сети

### 4. Push Notifications
- Запрос разрешения на уведомления
- Отправка тестовых уведомлений
- Обработка кликов по уведомлениям

### 5. PWA Features
- Web App Manifest для установки на устройство
- Install prompt для добавления на домашний экран
- Standalone режим работы

### 6. Cache Inspector
- Просмотр всех закэшированных ресурсов
- Управление кэшем (очистка, обновление)
- Статистика использования кэша

## Ключевые особенности

- **Offline-First Architecture**: приложение работает без интернета
- **Background Sync**: синхронизация данных при восстановлении связи
- **Install Prompt**: возможность установки как нативное приложение
- **Cache Management**: полный контроль над кэшированием

## Технологии

- Service Workers API
- Cache API
- Fetch API
- Notifications API
- Web App Manifest
- Background Sync API

## Запуск

Service Workers требуют HTTPS или localhost. Запустите через локальный сервер:

```bash
# Используйте любой HTTP-сервер:
python3 -m http.server 8000
# или
npx serve
```

Откройте `http://localhost:8000` и разрешите уведомления для полного функционала.

## Тестирование Offline

1. Откройте приложение в браузере
2. Загрузите данные через API Fetcher
3. Откройте DevTools → Network → Offline
4. Обновите страницу — приложение продолжит работать
5. Попробуйте загрузить те же данные — они загрузятся из кэша
