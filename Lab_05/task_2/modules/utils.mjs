export function updateDisplay(value) {
    const display = document.getElementById('display');
    if (display) display.innerText = value;
}

export function logToConsole(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}

export function updateCalculatorDisplay(state) {
    const expressionEl = document.getElementById('expression');
    const resultEl = document.getElementById('result');
    
    if (state.previousValue !== null && state.operator) {
        expressionEl.textContent = `${state.previousValue} ${state.operator}`;
    } else {
        expressionEl.textContent = '';
    }
    
    resultEl.textContent = state.currentValue;
}

export function handleNumber(state, num) {
    if (state.waitingForNewValue) {
        state.currentValue = num;
        state.waitingForNewValue = false;
    } else {
        state.currentValue = state.currentValue === '0' ? num : state.currentValue + num;
    }
    updateCalculatorDisplay(state);
    logToConsole(`Number entered: ${num}`);
}

export function handleOperator(state, op, performCalc) {
    const current = parseFloat(state.currentValue);
    
    if (state.previousValue === null) {
        state.previousValue = current;
    } else if (state.operator) {
        const result = performCalc(state.operator, state.previousValue, current);
        state.previousValue = result;
        state.currentValue = String(result);
    }
    
    state.operator = op;
    state.waitingForNewValue = true;
    updateCalculatorDisplay(state);
    logToConsole(`Operator selected: ${op}`);
}

export function handleEquals(state, performCalc) {
    if (state.operator && state.previousValue !== null) {
        const expression = `${state.previousValue} ${state.operator} ${state.currentValue}`;
        const result = performCalc(state.operator, state.previousValue, parseFloat(state.currentValue));
        
        state.history.push(`${expression} = ${result}`);
        state.currentValue = String(result);
        state.previousValue = null;
        state.operator = null;
        state.waitingForNewValue = true;
        updateCalculatorDisplay(state);
        
        logToConsole(`Calculation: ${expression} = ${result}`);
    }
}

export function handleClear(state) {
    state.currentValue = '0';
    state.previousValue = null;
    state.operator = null;
    state.waitingForNewValue = false;
    updateCalculatorDisplay(state);
    logToConsole('Calculator cleared');
}

export function handleDelete(state) {
    if (state.currentValue.length > 1) {
        state.currentValue = state.currentValue.slice(0, -1);
    } else {
        state.currentValue = '0';
    }
    updateCalculatorDisplay(state);
}

export async function handleAdvancedFunction(state, func) {
    try {
        const mathAdv = await import('./advanced_feature.mjs');
        const current = parseFloat(state.currentValue);
        let result;
        let expression;
        
        switch (func) {
            case 'sqrt':
                result = mathAdv.sqrt(current);
                expression = `√${current}`;
                break;
            case 'square':
                result = mathAdv.power(current, 2);
                expression = `${current}²`;
                break;
            case 'percent':
                result = current / 100;
                expression = `${current}%`;
                break;
            case 'sin':
                result = Math.sin(current * Math.PI / 180);
                expression = `sin(${current}°)`;
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180);
                expression = `cos(${current}°)`;
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180);
                expression = `tan(${current}°)`;
                break;
        }
        
        result = Math.round(result * 100000000) / 100000000;
        state.history.push(`${expression} = ${result}`);
        state.currentValue = String(result);
        state.waitingForNewValue = true;
        updateCalculatorDisplay(state);
        
        logToConsole(`Advanced function: ${expression} = ${result}`);
    } catch (err) {
        console.error("Failed to load advanced module", err);
        alert('Ошибка загрузки расширенного модуля');
    }
}