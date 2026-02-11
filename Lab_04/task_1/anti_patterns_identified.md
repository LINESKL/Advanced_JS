# Antipatterns Identified

### 1. Global Namespace Pollution
- Название: Global Namespace Pollution
- Строки: 24-34
- Описание: Использование глобальных переменных и функций, что может привести к конфликтам имен и затруднить отладку.
- Почему это плохо: Глобальные переменные могут быть изменены из любой части программы, что делает код менее предсказуемым и сложным для понимания.
- Влияние: Повышает вероятность ошибок и затрудняет поддержку кода.
```
javascript

var userName = " " ;
var userEmail = " " ;
var userAge = 0;
var isLoggedIn = false ;
var currentPage = 1;
var totalPages = 10;
var dataCache = {};
var config = {};
var utils = {};
var helpers = {};
```

### 2. Code Duplication: Validation logic 
- Название: Code Duplication
- Строки: 55-91
- Описание: Повторение одного и того же кода для валидации данных в нескольких местах. Три функции (validateEmail, validateUserEmail, checkEmailFormat) делают одно и то же.
- Почему это плохо: Дублирование кода увеличивает кодовую базу, делает ее менее поддерживаемой и увеличивает вероятность ошибок при изменении логики валидации. Нарушение принципа DRY. Если изменится формат email, придется менять код в трех местах.
- Влияние: Увеличивает время разработки и затрудняет внесение изменений в будущем.
```
javascript

function validateUserEmail ( email ) {
if ( email === null || email === undefined || email === " " ) {
return false ;
}
if ( email . indexOf ( " @ " ) === -1) {
return false ;
}
if ( email . indexOf ( " . " ) === -1) {
return false ;
}
return true ;
}

function checkEmailFormat ( email ) {
if ( email === null || email === undefined || email === " " ) {
return false ;
}
if ( email . indexOf ( " @ " ) === -1) {
return false ;
}
if ( email . indexOf ( " . " ) === -1) {
return false ;
}
return true ;
}
```

### 3. Configuration Scattered Throughout Code
- Название: Configuration Scattered Throughout Code
- Строки: 314-328
- Описание: Конфигурационные параметры (URL, API_KEY) разбросаны по всему коду, что затрудняет их изменение и управление.
- Почему это плохо: Разбросанные конфигурационные параметры делают код менее организованным и затрудняют его поддержку. Если нужно изменить URL или API_KEY, придется искать их по всему коду.
- Влияние: Увеличивает время на внесение изменений и повышает вероятность ошибок при обновлении конфигурации.
```
javascript

var apiUrl = " https :// api . example . com " ;
var apiTimeout = 5000;
var maxRetries = 3;
var cacheExpiry = 3600000;
var defaultLanguage = " en " ;
var defaultCurrency = " USD " ;
var taxRate = 0.08;
var shippingThreshold = 100;
var shippingCost = 10;
```

### 4. Event Handlers as Global Functions
- Название: Event Handlers as Global Functions
- Строки: 354-371
- Описание: Обработчики событий (onLogicClick, onLogoutClick) определены как глобальные функции, тчо можем привести к конфликтам имен и затруднить отладку.
- Почему это плохо: Глобальные функции могут быть вызваны из любой части программы, что делает код менее предсказуемым и сложным для понимания. Это также может привести к конфликтам имен, если в будущем будут добавлены другие функции с такими же именами.
- Влияние: Повышает вероятность ошибок и затрудняет поддержку кода.
```
javascript

function onLoginClick () {
handleUserAction ( " login " , {
name : " John Doe " ,
email : " john@example . com "
}) ;
}
361
function onLogoutClick () {
handleUserAction ( " logout " , {}) ;
}
```

### 5. Data Processing with Tight Coupling
- Название: Data Processing with Tight Coupling
- Строки: 376-403
- Описание: Функция processUserData объединяет в себе и валидацию, и сохранение, и обновление интерфейса. Это создает сильную связь между различными аспектами обработки данных.
- Почему это плохо: Сильная связь между различными аспектами обработки данных делает код менее гибким и сложным для тестирования. Если нужно изменить логику валидации, придется изменять код, связанный с сохранением и обновлением интерфейса, что может привести к ошибкам.
- Влияние: Увеличивает время разработки и затрудняет внесение изменений в будущем.
```
javascript

function processUserData ( userData ) {
userName = userData . name ;
userEmail = userData . email ;
userAge = userData . age ;
381
if ( validateEmail ( userEmail ) ) {
isLoggedIn = true ;
updateDisplay () ;
saveToCache () ;
} else {
console . log ( " Invalid email " ) ;
}
}
```