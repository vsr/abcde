class AbcdeForm extends HTMLElement {
  static get observedAttributes() {
    return ["text", "priority"];
  }
  get text() {
    this.form.text.value;
  }
  set text(value) {
    this.form.text.value = value;
  }
  get priority() {
    this.form.priority.value;
  }
  set priority(value) {
    this.changePriority(value);
  }
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.formReset = this.formReset.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.changePriority = this.changePriority.bind(this);
  }
  connectedCallback() {
    const templ = document.querySelector("#abcde-form-template").content;
    this.appendChild(document.importNode(templ, true));
    const form = this.querySelector("form");
    this.form = form;
    form.addEventListener("change", this.handleChange);
    form.addEventListener("submit", this.formSubmit);
    form.addEventListener("reset", this.formReset);
    this.text = this.getAttribute("text");
    this.changePriority(this.getAttribute("priority"));
    this.addEventListener("propertychange", (ev) => {
      console.log("property change", ev);
    });
  }
  disconnectedCallback() {
    const form = this.querySelector("form");
    form.removeEventListener("change", this.handleChange);
    form.removeEventListener("submit", this.formSubmit);
    form.removeEventListener("reset", this.formReset);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributes changed.", name, oldValue, newValue);
    if (oldValue !== newValue && this.form) {
      if (name === "text") {
        this.form.text.value = newValue;
      } else if (name === "priority") {
        this.changePriority(newValue);
      }
    }
  }
  changePriority(priorityValue) {
    if ("ABCDE".indexOf(priorityValue) < 0) {
      return this.changePriority("A");
    }
    this.form.priority.value = priorityValue;
    this.form
      .querySelector(`input[name="priority"][value="${priorityValue}"]`)
      .dispatchEvent(new Event("change", { bubbles: true }));
  }
  handleChange(ev) {
    console.log(ev);
    const selectedPriorityStyle = ["bg-gray-800", "text-white"];
    const form = this.querySelector("form");
    if (ev && ev.target && ev.target.name === "priority") {
      form.querySelectorAll('input[name="priority"]').forEach((el) => {
        if (el.checked) {
          el.parentNode.classList.add(...selectedPriorityStyle);
        } else {
          el.parentNode.classList.remove(...selectedPriorityStyle);
        }
      });
    }
  }
  formSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: {
          text: this.form.text.value,
          priority: this.form.priority.value,
        },
      })
    );
  }
  formReset(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("delete", {
        detail: {},
      })
    );
  }
}

customElements.define("abcde-form", AbcdeForm);
