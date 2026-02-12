export const ERRORS = {
    DIV_BY_ZERO: 'Деление на ноль невозможно.',
    INVALID_INPUT: 'Неверный ввод. Введите корректное число.',
}

export const APP_NAME = 'JS Калькулятор 2.0';

export const INITIAL_STATE = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false,
    history: []
};