/**
 * SCENARIO_05: Undo/Redo for Task Manager (Command Pattern)
 */

// Класс "Получатель" (Receiver) - сама доска задач
class TaskBoard {
  constructor() {
    this.cards = [
      { id: 1, title: 'Сверстать макет', column: 'TODO' },
      { id: 2, title: 'Написать тесты', column: 'TODO' }
    ];
  }

  moveCard(id, toColumn) {
    const card = this.cards.find(c => c.id === id);
    if (card) {
      const oldColumn = card.column;
      card.column = toColumn;
      console.log(`[BOARD] Карточка #${id} перемещена из ${oldColumn} в ${toColumn}`);
      return oldColumn; // Возвращаем для возможности отмены
    }
  }
}

// Базовый класс команды
class MoveCardCommand {
  constructor(board, cardId, newColumn) {
    this.board = board;
    this.cardId = cardId;
    this.newColumn = newColumn;
    this.oldColumn = null;
  }

  execute() {
    // Сохраняем старое состояние перед выполнением
    this.oldColumn = this.board.moveCard(this.cardId, this.newColumn);
  }

  undo() {
    // Возвращаем в старое состояние
    this.board.moveCard(this.cardId, this.oldColumn);
  }
}

// Класс "Инициатор" (Invoker) - управляет историей
class ActionHistory {
  constructor() {
    this._history = [];   // Стек для Undo
    this._redoStack = []; // Стек для Redo
  }

  execute(command) {
    command.execute();
    this._history.push(command);
    this._redoStack = []; // При новом действии очищаем Redo стек
    console.log('[HISTORY] Команда выполнена.');
  }

  undo() {
    const command = this._history.pop();
    if (command) {
      console.log('\n[HISTORY] Отмена действия...');
      command.undo();
      this._redoStack.push(command);
    }
  }

  redo() {
    const command = this._redoStack.pop();
    if (command) {
      console.log('\n[HISTORY] Повтор действия...');
      command.execute();
      this._history.push(command);
    }
  }
}

// --- ДЕМОНСТРАЦИЯ ---
const myBoard = new TaskBoard();
const history = new ActionHistory();

// 1. Двигаем карточку
const move1 = new MoveCardCommand(myBoard, 1, 'IN_PROGRESS');
history.execute(move1);

// 2. Двигаем еще раз
const move2 = new MoveCardCommand(myBoard, 1, 'DONE');
history.execute(move2);

// 3. Отмена (Undo)
history.undo();

// 4. Повтор (Redo)
history.redo();