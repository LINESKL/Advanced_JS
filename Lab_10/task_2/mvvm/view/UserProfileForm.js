export class UserProfileForm {
  constructor(containerId, viewModel) {
    this.container = document.getElementById(containerId);
    this.viewModel = viewModel;
    this.activeField = null; // Для сохранения фокуса

    // Подписываемся на изменения ОДИН РАЗ в конструкторе
    this.subscribeToChanges();
    // Вешаем делегированные события ОДИН РАЗ
    this.attachInitialEvents();
  }

  render() {
    const vm = this.viewModel;
    // Сохраняем, какое поле было в фокусе и где был курсор
    const activeElement = document.activeElement;
    const selectionStart = activeElement?.selectionStart;
    const fieldName = activeElement?.dataset?.field;

    this.container.innerHTML = `
            <div class="mvvm-form">
                <h1>User Profile (MVVM)</h1>
                <div class="form-group">
                    <label>First Name:</label>
                    <input type="text" data-field="firstName" value="${vm.firstName}" />
                    <span class="error">${vm.errors?.firstName || ""}</span>
                </div>
                <div class="form-group">
                    <label>Last Name:</label>
                    <input type="text" data-field="lastName" value="${vm.lastName}" />
                    <span class="error">${vm.errors?.lastName || ""}</span>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="text" data-field="email" value="${vm.email}" />
                    <span class="error">${vm.errors?.email || ""}</span>
                </div>
                <div class="form-group">
                    <label>Age:</label>
                    <input type="text" data-field="age" value="${vm.age}" />
                    <span class="error">${vm.errors?.age || ""}</span>
                </div>
                <div class="preview">
                    <h3>Preview</h3>
                    <p><strong>Full Name:</strong> ${vm.fullName}</p>
                    <p><strong>Valid:</strong> ${vm.isValid ? "Yes" : "No"}</p>
                </div>
                <div class="actions">
                    <button id="saveBtn" ${vm.isValid ? "" : "disabled"}>Save</button>
                    <button id="resetBtn">Reset</button>
                </div>
                <div id="message"></div>
            </div>
        `;

    // Восстанавливаем фокус и позицию курсора
    if (fieldName) {
      const input = this.container.querySelector(`[data-field="${fieldName}"]`);
      if (input) {
        input.focus();
        if (selectionStart !== undefined) {
          const supportedTypes = ["text", "search", "url", "tel", "password"];
          if (supportedTypes.includes(input.type)) {
            input.setSelectionRange(selectionStart, selectionStart);
          }
        }
      }
    }
  }

  attachInitialEvents() {
    // View to ViewModel (Two-way binding)
    this.container.addEventListener("input", (e) => {
      if (e.target.dataset.field) {
        const field = e.target.dataset.field;
        this.viewModel[field] = e.target.value;
      }
    });

    // Делегирование кликов для кнопок
    this.container.addEventListener("click", (e) => {
      if (e.target.id === "saveBtn") {
        const result = this.viewModel.save();
        const message = document.getElementById("message");
        if (result.success) {
          message.textContent = "Profile saved successfully!";
          message.className = "success";
        } else {
          message.textContent = "Please fix the errors.";
          message.className = "error-msg"; // Исправлено имя класса (было error)
        }
      }

      if (e.target.id === "resetBtn") {
        this.viewModel.reset();
      }
    });
  }

  subscribeToChanges() {
    // ViewModel to View
    ["firstName", "lastName", "email", "age", "errors"].forEach((field) => {
      this.viewModel.$watch(field, () => this.render());
    });
  }
}
