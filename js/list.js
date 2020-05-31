class AbcdeList extends HTMLElement {
  constructor() {
    super();
    this._tasks = [];
  }
  get tasks() {
    return this._tasks;
  }
  set tasks(_tasks) {
    this._tasks = _tasks;
  }
  connectedCallback() {}
  disconnectedCallback() {}
}
customElements.define("abcde-list", AbcdeList);
