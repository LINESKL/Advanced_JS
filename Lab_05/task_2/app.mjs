import * as config from './modules/constants.mjs';
import { performCalculation } from './modules/core.mjs';
import { 
    logToConsole, 
    handleNumber, 
    handleOperator, 
    handleEquals, 
    handleClear, 
    handleDelete, 
    handleAdvancedFunction 
} from './modules/utils.mjs';

// Состояние калькулятора
const calculatorState = { ...config.INITIAL_STATE };

// Инициализация
document.getElementById('title').innerText = config.APP_NAME;

// Обработчики событий для кнопок
document.querySelectorAll('[data-number]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(calculatorState, e.target.dataset.number);
    });
});

document.querySelectorAll('[data-operator]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(calculatorState, e.target.dataset.operator, performCalculation);
    });
});

document.querySelector('[data-action="equals"]').addEventListener('click', () => {
    handleEquals(calculatorState, performCalculation);
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    handleClear(calculatorState);
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    handleDelete(calculatorState);
});

// Переключение расширенной панели
const toggleAdvanced = document.getElementById('toggle-advanced');
const advancedPanel = document.getElementById('advanced-panel');
toggleAdvanced.addEventListener('click', () => {
    advancedPanel.classList.toggle('active');
    toggleAdvanced.textContent = advancedPanel.classList.contains('active') 
        ? 'Скрыть расширенные функции' 
        : 'Расширенные функции';
    logToConsole('Advanced panel toggled');
});

// Обработчики для расширенных функций
document.querySelectorAll('[data-advanced]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleAdvancedFunction(calculatorState, e.target.dataset.advanced);
    });
});

// Поддержка клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        handleNumber(calculatorState, e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(calculatorState, e.key, performCalculation);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals(calculatorState, performCalculation);
    } else if (e.key === 'Escape' || e.key === 'c') {
        handleClear(calculatorState);
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete(calculatorState);
    }
});

// Lazy loading истории при скролле
const historySection = document.getElementById('history-section');
const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
        try {
            const historyModule = await import('./modules/lazy_component.mjs');
            historyModule.renderHistory(calculatorState.history);
            
            // Обновление истории каждые 2 секунды если она видна
            setInterval(() => {
                if (calculatorState.history.length > 0) {
                    historyModule.renderHistory(calculatorState.history);
                }
            }, 2000);
            
            observer.disconnect();
            logToConsole('History module loaded');
        } catch (err) {
            console.error("History module error", err);
        }
    }
}, { threshold: 0.5 });

observer.observe(historySection);

logToConsole('Calculator initialized');