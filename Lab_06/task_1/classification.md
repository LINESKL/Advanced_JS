# Classification of Snippets

## JavaScript Snippets


### Snippet ID: SNIPPET_1
### Pattern Family: Creational
### Specific Pattern Name: Singleton
### Evidence:
``` bash
if (DatabaseConnection._instance) {
  return DatabaseConnection._instance;
}
```
### Book Reference: Ch. 6, "Cretional Design Patterns"; Ch.7, "The Singleton Pattern"
### Reasoning: Этот сниппет относится к порождающему семейству, так как он контролирует процесс создания объекта. Он реализует паттерн Singleton, гарантируя, что у класса будет только один экземпляр, и предоставляя глобальную точку доступа к нему через метод getInstance().

---

### Snippet ID: SNIPPET_2
### Pattern Family: Behavioral
### Specific Pattern Name: Observer
### Evidence:
``` bash
subscribe(event, callback) { ... }
publish(event, data) { ... }
```
### Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Observer Pattern"
### Reasoning: Этот паттерн относится к поведенческому семейству, так как его основная цель — наладить коммуникацию между объектами. EventBus позволяет разным частям системы обмениваться сообщениями, не завися напрямую друг от друга (слабая связность).

---

### Snippet ID: SNIPPET_3
### Pattern Family: Structural
### Specific Pattern Name: Facade
### Evidence:
``` bash
login(token) {
  if (!this._auth.validateToken(token)) { ... }
  const user = this._repo.findByToken(token);
  this._logger.log('LOGIN', user);
```
### Book Reference: Ch. 6, "Structural Design Patterns"; Ch. 7, "The Facade Pattern"
### Reasoning: Этот паттерн относится к структурному семейству, так как он определяет способ композиции объектов для упрощения структуры системы. Класс UserSession выступает в роли Фасада, предоставляя высокоуровневый интерфейс (метод login), который скрывает сложность взаимодействия с подсистемами авторизации, работы с данными и логирования.

---

### Snippet ID: SNIPPET_4
### Pattern Family: Creational
### Specific Pattern Name: Factory Method
### Evidence:
``` bash
function createNotifier ( type ) {
    switch ( type ) {
        case ' email ': return new KazakhEmailNotifier () ;
        case ' sms ': return new SMSNotifier () ;
        case ' telegram ': return new TelegramNotifier () ;
        default : throw new Error ( ` Unknown notifier type : $ { type } `) ;
    }
}
}
```
### Book Reference: Ch. 6, "Creational Design Patterns" (GoF Table); Ch. 7, "The Factory Pattern".
### Reasoning: Этот паттерн относится к порождающему семейству, так как он берет на себя логику создания объектов, избавляя клиента от необходимости использовать оператор new напрямую. Функция createNotifier выступает в роли фабрики, которая инкапсулирует процесс выбора и инициализации конкретных классов уведомлений на основе переданного типа.

---

### Snippet ID: SNIPPET_5
### Pattern Family: Structural
### Specific Pattern Name: Decorator
### Evidence:
``` bash
const base = new PlainTextLogger () ;
const withTime = new TimestampLogger ( base ) ;
const withBoth = new SeverityLogger ( withTime , ' ERROR ') 
```
### Book Reference: Ch. 6, "Structural Design Patterns"; Ch. 7, "The Decorator Pattern".
### Reasoning: Этот паттерн относится к структурному семейству, так как он описывает способ композиции объектов для получения новой функциональности. Сниппет реализует паттерн Decorator, позволяя динамически добавлять новые обязанности (метку времени или уровень важности) базовому логгеру, "оборачивая" его в дополнительные классы без изменения исходного кода PlainTextLogger.

---

### Snippet ID: SNIPPET_6
### Pattern Family: Creational
### Specific Pattern Name: Prototype
### Evidence:
``` bash
const car = vehiclePrototype . clone () ;
car . type = ' Car ';
car . speed = 120;
```
### Book Reference: Ch. 6, "Creational Design Patterns" (GoF Table); Ch. 7, "The Prototype Pattern".
### Reasoning: Этот паттерн относится к порождающему семейству, так как он позволяет клонировать объекты, создавая новые экземпляры на основе существующих прототипов. Сниппет демонстрирует использование прототипа vehiclePrototype для создания нового объекта car, который является клоном прототипа и имеет свои собственные свойства type и speed.

---

### Snippet ID: SNIPPET_7
### Pattern Family: Behavioral
### Specific Pattern Name: Chain of Responsibility
### Evidence:
``` javascript
handle ( ticket ) {
    if ( ticket . priority <= this . level ) {
        console . log ( `[ SNIPPET_07 ] Level - ${ this . level } support resolved ticket #${ ticket . id } `) ;
    } else if ( this . next ) {
        console . log ( `[ SNIPPET_07 ] Level - ${ this . level } passed ticket #${ ticket . id } to next `) ;
        this . next . handle ( ticket ) ;
    }
}
```
### Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Chain of Responsibility Pattern".
### Reasoning: Этот паттерн относится к поведенческому семейству, так как он определяет способ коммуникации между объектами. Сниппет демонстрирует использование цепочки обязанностей для обработки билетов, где каждый уровень поддержки может либо обработать билет самостоятельно, либо передать его следующему уровню.

---

### Snippet ID: SNIPPET_8
### Pattern Family: Behavioral
### Specific Pattern Name: Command
### Evidence:
``` javascript
const editor = new TextEditor () ;
const history = new CommandHistory () ;
history . run ( new WriteCommand ( editor , ' Hello ') ) ;
history . run ( new WriteCommand ( editor , ' World ') ) ;
```
### Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Command Pattern".
### Reasoning: Этот паттерн относится к поведенческому семейству, так как он инкапсулирует запрос на выполнение действия в виде отдельного объекта. Это позволяет отделять объект, инициирующий действие, от объекта, который его выполняет, а также дает возможность хранить историю команд для реализации функций отмены (Undo) и повтора (Redo).

---

### Snippet ID: SNIPPET_9
### Pattern Family: Structural
### Specific Pattern Name: Flyweight
### Evidence:
``` javascript
get(name, color, texture) {
  const key = `${name}_${color}_${texture}`;
  if (!this._types[key]) {
    this._types[key] = new TreeType(name, color, texture);
  }
  return this._types[key];
}
```
### Book Reference: Ch. 6, "Structural Design Patterns"; Ch. 7, "The Flyweight Pattern".
### Reasoning: Этот паттерн относится к структурному семейству, так как он организует композицию объектов для оптимизации использования памяти. В сниппете реализован паттерн Flyweight: общие данные деревьев (цвет, текстура) выносятся в отдельные разделяемые объекты TreeType, которые кэшируются фабрикой, в то время как уникальное состояние (координаты) хранится в контекстных объектах Tree.

---

### Snippet ID: SNIPPET_10
### Pattern Family: Behavioral
### Specific Pattern Name: Mediator
### Evidence:
``` javascript
send(from, message, toName = null) {
  if (toName) {
    const target = this._members[toName];
    if (target) target.receive(from.name, message);
  } else {
    Object.values(this._members).forEach(m => { ... });
  }
}
```
### Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Mediator Pattern".
### Reasoning: Этот паттерн относится к поведенческому семейству, так как он упрощает и централизует коммуникацию между объектами. В сниппете класс ChatRoom выступает в роли Посредника (Mediator): пользователи не взаимодействуют друг с другом напрямую, а отправляют сообщения через чат-комнату, которая сама решает, кому доставить сообщение.




