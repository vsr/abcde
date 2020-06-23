class AbcdeList extends HTMLElement {
  static get template() {
    return `<ol class="task-list w-full overflow-hidden"></ol>
            <p id="no-task-message" class="empty-state-message my-10 mx-5 text-3xl">
              No tasks to show. <br />
              Start by adding your tasks.
            </p>`;
  }
  constructor(tasks = []) {
    super();
    this._tasks = tasks;
    this.renderTasks = this.renderTasks.bind(this);
    this.onItemSave = this.onItemSave.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
  }
  get tasks() {
    return this._tasks;
  }
  set tasks(tasks) {
    this._tasks = tasks;
    this.renderTasks();
  }
  connectedCallback() {
    this.innerHTML = this.constructor.template;
    this.renderTasks();
  }
  disconnectedCallback() {}
  onItemSave(ev) {
    console.log("on item save", ev, this.tasks);
  }
  onItemDelete(ev) {
    console.log("on item detelte", ev, this.tasks);
  }
  renderTasks() {
    console.log("renderTasks", this._tasks);
    const tl = this.querySelector(".task-list");
    const emptyMessage = this.querySelector("#no-task-message");
    tl.innerHTML = "";
    this._tasks.forEach((task) => {
      const item = new AbcdeItem();
      item.text = task.taskName;
      item.priority = task.classification;
      item.editing = false;
      // item.addEventListener("save", (ev) => console.log("save", ev));
      // item.addEventListener("delete", (ev) => console.log("delete", ev));
      item.onSave = this.onItemSave;
      item.onDelete = this.onItemDelete;
      tl.appendChild(item);
    });
    if (this._tasks.length > 0) {
      emptyMessage.classList.add("hidden");
    } else {
      emptyMessage.classList.remove("hidden");
    }
  }
}
customElements.define("abcde-list", AbcdeList);
