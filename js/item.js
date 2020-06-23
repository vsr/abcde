class AbcdeItem extends HTMLElement {
  static get template() {
    return `
        <style>

        li {
             transition: height 0.3s ease-out;
        }
        .editing li {
        }
        article, abcde-form {
            // transition: all 0.3s ease-out;
        }
        article {
            top: 0;
        }
        abcde-form {
            top: 100%;
        }
        .editing article {
            top: -100%;
        }
        .editing abcde-form {
            top: 0%;
        }

        </style>
      <li class="task-row relative overflow-hidden px-2 py-0 hover:bg-gray-100 h-32">
            <article class="absolute w-full p-2 bg-blue-200 h-16">
                <p class="task-name text-2xl px-2 py-0 text-gray-700"></p>
                <div class="flex justify-between">
                    <span class="task-priority text-gray-600 p-0"></span>
                    <span class="py-0 px-1 ">
                        <button class="edit-task rounded bg-gray-900 text-white shadow text-xs py-0 px-2">edit</button>
                    </span>
                </div>
            </article>
            <abcde-form class="absolute w-full p-2 bg-green-200 h-32"></abcde-form>
        </li>
        `;
  }
  static get observedAttributes() {
    return ["text", "priority"];
  }
  constructor() {
    super();
    this._text = "";
    this._priority = "A";
    this.isEditing = false;
    this.toggleEdit = this.toggleEdit.bind(this);
    this.itemSave = this.itemSave.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
    this.updateDomValues = this.updateDomValues.bind(this);
  }
  get text() {
    return this._text;
  }
  set text(_text) {
    this._text = _text || "";
  }
  get priority() {
    return this._priority;
  }
  set priority(_priority) {
    this._priority = "ABCDE".indexOf(_priority) >= 0 ? _priority : "A";
  }
  get editing() {
    return this.isEditing;
  }
  set editing(value) {
    this.isEditing = value;
    if (this.isEditing) {
      this.classList.add("editing");
      this.querySelector("abcde-form input[name='text']").focus();
    } else {
      this.classList.remove("editing");
    }
  }
  get onSave() {
    return this._onSave || (() => {});
  }
  set onSave(fn) {
    this._onSave = fn;
  }
  get onDelete() {
    return this._onDelete || (() => {});
  }
  set onDelete(fn) {
    this._onDelete = fn;
  }
  connectedCallback() {
    this.innerHTML = this.constructor.template;
    this.updateDomValues();
    this.querySelector("article .edit-task").addEventListener(
      "click",
      this.toggleEdit
    );
    this.querySelector("abcde-form").addEventListener("submit", this.itemSave);
    this.querySelector("abcde-form").addEventListener(
      "delete",
      this.itemDelete
    );
  }
  disconnectedCallback() {
    this.querySelector("article .edit-task").removeEventListener(
      "click",
      this.toggleEdit
    );
    this.querySelector("abcde-form").removeEventListener(
      "submit",
      this.itemSave
    );
    this.querySelector("abcde-form").removeEventListener(
      "delete",
      this.itemDelete
    );
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributes changed.", name, oldValue, newValue);
    if (oldValue !== newValue) {
      if (name === "text") {
        this.text = newValue;
      } else if (name === "priority") {
        this.priority = newValue;
      }
      this.updateDomValues();
    }
  }
  updateDomValues() {
    if (this.innerHTML === "") return;
    this.querySelector("article .task-name").textContent = this.text;
    this.querySelector("article .task-priority").textContent = this.priority;
    this.querySelector("abcde-form").text = this.text;
    this.querySelector("abcde-form").priority = this.priority;
  }
  toggleEdit() {
    this.editing = !this.editing;
  }
  itemSave(ev) {
    console.log("save item", ev);
    this.text = ev.detail.text;
    this.priority = ev.detail.priority;
    this.updateDomValues();
    this.toggleEdit();
    this.dispatchEvent(
      new CustomEvent("save", {
        detail: { text: this.text, priority: this.priority },
      })
    );
    this.onSave();
  }
  itemDelete(ev) {
    console.log("delete item", ev);
    this.dispatchEvent(
      new CustomEvent("delete", {
        detail: {},
      })
    );
    this.onDelete();
  }
}

customElements.define("abcde-item", AbcdeItem);
