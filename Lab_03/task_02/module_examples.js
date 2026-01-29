// Вариант 1: Класический Module Pattern (через IIFE)
const classicModule = (function () {
    // Приватная переменная
    let counter = 0;

    // Приватный метод
    const reportChange = () => {
        console.log(`Текущее значение счетчика: ${counter}`);
    };

    return {
        // Публичные методы
        increment: function () {
            counter++;
            reportChange();
        },
        reset: function () {
            counter = 0;
            reportChange();
        }
    };
})();

//Вариант 2: Revealing Module Pattern
// Все методы и переменные объявляются внутри модуля,
// а затем "раскрываются" наружу через возвращаемый объект.
const revealingModule = (function () {
    let privateData = 'Секретная информация';

    function showData() {
        return privateData;
    }

    function setData(newData) {
        privateData = newData;
    }

    return {
        get: showData,
        set: setData
    };
})();

// Вариант 3: ES6 Модули (использование export/import)
class ModernModule {
    #privateField = 'Я приватное поле через #';

    publicMethod() {
        return `Доступ к ${this.#privateField}`;
    }
}




console.log('Классический Module Pattern:');
classicModule.increment();
classicModule.increment();

console.log('\nRevealing Module Pattern:');
console.log(revealingModule.get());

console.log('\nES6 Модули:');
const modernModuleInstance = new ModernModule();
console.log(modernModuleInstance.publicMethod());
