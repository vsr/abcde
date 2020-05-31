class AbcdeItem extends HTMLElement {
  static get template() {
    return `
        <style>
        li {
            min-height: 6rem;
            transition: height 0.3s ease-out;
        }
        .editing li {
            min-height: 7rem;
        }
        article, abcde-form {
            transition: all 0.3s ease-out;
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
      <li class="task-row relative px-2 py-0 transition-transform duration-500 ease-in-out hover:bg-gray-100">
            <article class="absolute w-full p-2">
                <p class="task-name text-2xl px-2 py-0 text-gray-700"></p>
                <div class="flex justify-between">
                    <span class="task-priority text-gray-600 p-0"></span>
                    <span class="py-0 px-1 ">
                        <button class="edit-task rounded bg-gray-900 text-white shadow text-xs py-0 px-2">edit</button>
                    </span>
                </div>
            </article>
            <abcde-form class="absolute w-full p-2"></abcde-form>
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
  }
  itemDelete(ev) {
    console.log("delete item", ev);
    this.dispatchEvent(
      new CustomEvent("delete", {
        detail: {},
      })
    );
  }
}

customElements.define("abcde-item", AbcdeItem);
