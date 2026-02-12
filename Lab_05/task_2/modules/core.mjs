import { ERRORS } from "./constants.mjs";

export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => b === 0 ? null : a / b;

export function performCalculation(operator, prev, current) {
    let result;
    
    switch (operator) {
        case '+':
            result = add(prev, current);
            break;
        case '-':
            result = subtract(prev, current);
            break;
        case '*':
            result = multiply(prev, current);
            break;
        case '/':
            result = divide(prev, current);
            if (result === null) {
                console.error(ERRORS.DIV_BY_ZERO);
                return prev;
            }
            break;
        default:
            return current;
    }
    
    return Math.round(result * 100000000) / 100000000;
}