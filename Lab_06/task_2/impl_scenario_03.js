/**
 * SCENARIO_03: UI Notification System (Observer Pattern)
 */

// Класс-субъект (Издатель), который отслеживает сдачу домашних заданий
class HomeworkReminder {
  constructor() {
    this._subscribers = []; // Список "слушателей" (observers)
  }

  // Метод для подписки
  subscribe(observer) {
    this._subscribers.push(observer);
    console.log(`[SYSTEM] Компонент ${observer.constructor.name} подписан на уведомления.`);
  }

  // Метод для уведомления всех подписчиков
  submitHomework(homework) {
    console.log(`\n[EVENT] Домашнее задание сдано: "${homework.title}"`);
    
    // ПАТТЕРН: Оповещаем каждого подписчика, вызывая у него метод update
    this._subscribers.forEach(subscriber => {
      subscriber.update(homework);
    });
  }
}

// Конкретный наблюдатель 1: Электронный журнал
class GradeBook {
  update(homework) {
    console.log(`[GradeBook] Запись создана для: ${homework.title}. Ожидание оценки...`);
  }
}

// Конкретный наблюдатель 2: Календарь
class Calendar {
  update(homework) {
    console.log(`[Calendar] Дедлайн для "${homework.title}" отмечен как выполненный.`);
  }
}

// --- ДЕМОНСТРАЦИЯ ---
const reminder = new HomeworkReminder();

const gradeBook = new GradeBook();
const calendar = new Calendar();

// Подписываем компоненты на события
reminder.subscribe(gradeBook);
reminder.subscribe(calendar);

// Симулируем событие
const myWork = { title: 'Лабораторная работа №6', student: 'Асель' };
reminder.submitHomework(myWork);