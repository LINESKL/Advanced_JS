// 1. Определение поведения островов (Behaviors)
const IslandRegistry = {
  counter: (container) => {
    console.log("[Island Engine] Initializing Counter Island", container);
    let count = 0;
    const display = container.querySelector(".count-display");
    const btnInc = container.querySelector(".btn-increase");
    const btnDec = container.querySelector(".btn-decrease");

    btnInc.addEventListener("click", () => {
      count++;
      display.textContent = count;
    });

    btnDec.addEventListener("click", () => {
      if (count > 0) count--;
      display.textContent = count;
    });
  },

  "color-picker": (container) => {
    console.log("[Island Engine] Initializing Color Picker Island", container);
    const preview = container.querySelector(".preview-box");
    const buttons = container.querySelectorAll("button[data-color]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const hex = e.target.dataset.color;
        preview.style.backgroundColor = hex;
      });
    });
  },
};

// 2. Обнаружение и монтирование (Discovery and Mount)
document.addEventListener("DOMContentLoaded", () => {
  const islands = document.querySelectorAll("[data-island-type]");

  // Использование IntersectionObserver для ленивой гидрации
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const type = entry.target.dataset.islandType;
          if (IslandRegistry[type]) {
            IslandRegistry[type](entry.target);
            // Прекращаем наблюдение после гидрации
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.1 },
  ); // Срабатывает при видимости 10%

  islands.forEach((island) => observer.observe(island));
});
