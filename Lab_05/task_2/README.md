# Lab 5.2: Модульное приложение-калькулятор

<table>
<tr>
<td width="60%">

## Обзор

Создание модульного приложения с демонстрацией статических и динамических импортов.

## Структура модулей

**Статические (загружаются сразу):**
- `constants.mjs` — текстовые константы
- `core.mjs` — базовые операции (+, -, *, /)
- `utils.mjs` — работа с DOM

**Динамические (по требованию):**
- `advanced_feature.mjs` — научный режим (по клику)
- `lazy_component.mjs` — история (при прокрутке)

</td>
<td width="40%">

<img src="../assets/image.png" width="100%" alt="Modular Calculator">

</td>
</tr>
</table>

## Стратегии импорта

### Static Import
```javascript
import { add, subtract } from './modules/core.mjs';
```
Загружается до выполнения кода.

### Dynamic Import (по клику)
```javascript
button.addEventListener('click', async () => {
  const module = await import('./modules/advanced_feature.mjs');
});
```

### Dynamic Import (при прокрутке)
```javascript
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    import('./modules/lazy_component.mjs');
  }
});
```

## Преимущества

- Начальный bundle: 50KB → 20KB (-60%)
- Параллельная загрузка модулей
- Кеширование в браузере

---
*Выполнил: Нурканат Алиар | Дата: 2026-02-12*
