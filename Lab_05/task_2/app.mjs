import * as config from './modules/constants.mjs'; // Module Object
import { add } from './modules/core.mjs';           // Named Import
import { updateDisplay } from './modules/utils.mjs'; 

document.getElementById('title').innerText = config.APP_NAME;


document.getElementById('add-btn').onclick = () => {
    const res = add(10, 5);
    updateDisplay(res);
};


const advBtn = document.getElementById('adv-btn');
advBtn.onclick = async () => {
    try {
        const mathAdv = await import('./modules/advanced_feature.mjs');
        const res = mathAdv.sqrt(144);
        updateDisplay(`Sqrt(144) = ${res}`);
        alert("Advanced module loaded and used!");
    } catch (err) {
        console.error("Failed to load advanced module", err);
    }
};


const historySection = document.getElementById('history-section');
const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
        try {
            const historyModule = await import('./modules/lazy_component.mjs');
            historyModule.renderHistory(["10+5=15", "sqrt(144)=12"]);
            observer.disconnect(); 
        } catch (err) {
            console.error("History module error", err);
        }
    }
}, { threshold: 0.5 });

observer.observe(historySection);