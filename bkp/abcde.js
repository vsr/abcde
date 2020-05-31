// function getParentNodeWithClass(el, className) {
//   if (el.classList.contains(className)) return el;
//   else if (el.parentNode)
//     return getParentNodeWithClass(el.parentNode, className);
//   else return null;
// }

// class AbcdeForm extends HTMLFormElement {
//   constructor() {
//     super();
//     console.log("abcdeform", arguments, this);
//     const shadow = this.attachShadow({ mode: "open" });
//     const el = document.createElement("p");
//     el.classList.add("text-xl", "text-blue-700");
//     el.textContent = "this is form";
//     shadow.appendChild(el);
//   }
// }
// customElements.define("abcde-form", AbcdeForm, { extends: "form" });

// const ABCDE = function (form, taskList) {
//   this.$form = form;
//   this.$taskList = taskList;
//   this.tasks = this.getTasks();
//   this.taskTemplate = document.querySelector("#task-template");
//   form.addEventListener("submit", this.formSubmit.bind(this));
//   form.addEventListener("change", this.formChange.bind(this));
//   this.renderTasks();
//   this.$form.taskPriority.value = "A";
//   this.$form
//     .querySelector('input[value="A"')
//     .dispatchEvent(new Event("change", { bubbles: true }));
// };
// ABCDE.prototype.consts = {
//   prioritySelectedClass: ["bg-gray-800", "text-white"],
// };
// ABCDE.prototype.renderTasks = function () {
//   const instance = this;
//   const tasks = this.tasks;
//   const taskList = this.$taskList;
//   taskList.innerHTML = "";
//   if (tasks.length === 0) {
//     document.querySelector(".empty-state-message").classList.remove("hidden");
//   } else {
//     document.querySelector(".empty-state-message").classList.add("hidden");
//   }
//   tasks.sort(
//     (a, b) => a.classification.charCodeAt(0) - b.classification.charCodeAt(0)
//   );
//   tasks.forEach((task, index) => {
//     const node = this.taskTemplate.content.cloneNode(true);
//     const form = node.querySelector("form");
//     const article = node.querySelector("article");
//     article.querySelector(".task-priority").textContent = task.classification;
//     article.querySelector(".task-name").textContent = task.taskName;
//     form.setAttribute("data-classification", task.classification);
//     form.taskName.value = task.taskName;
//     form.taskPriority.value = task.classification;
//     form.style.transform = "translateX(600px)";
//     node.children[0].classList.add(
//       index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
//     );
//     taskList.appendChild(node);
//     article
//       .querySelector(".edit-task")
//       .addEventListener("click", function (ev) {
//         const node = getParentNodeWithClass(ev.target, "task-row");
//         node.classList.toggle("editing");
//       });
//     setTimeout(() => {
//       form.style.transform = "translateX(0)";
//     }, 200 * index);
//     /*
//                                 form.taskName.addEventListener('change', function (ev) {
//                                     task.taskName = ev.target.value;
//                                     instance.persistTasks();
//                                     instance.renderTasks();
//                                 });
//                                 form.taskClassification.addEventListener('change', function (ev) {
//                                     task.classification = ev.target.value;
//                                     instance.persistTasks();
//                                     instance.renderTasks();
//                                 });
//                                 */
//     form.addEventListener("change", function (ev) {
//       console.log("form changed", ev);
//     });
//     form
//       .querySelector('button[name="delete"]')
//       .addEventListener("click", (ev) => {
//         tasks.splice(index, 1);
//         instance.persistTasks();
//         instance.renderTasks();
//       });
//     form
//       .querySelector('button[name="done"]')
//       .addEventListener("click", (ev) => {
//         const node = getParentNodeWithClass(ev.target, "task-row");
//         node.classList.toggle("editing");
//       });
//   });
// };
// ABCDE.prototype.getTasks = function () {
//   if (!window.localStorage) {
//     return [];
//   } else {
//     return JSON.parse(window.localStorage.getItem("tasks") || "[]");
//   }
// };
// ABCDE.prototype.persistTasks = function () {
//   window.localStorage &&
//     window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
// };
// ABCDE.prototype.formSubmit = function () {
//   const classification = this.$form.taskPriority.value || "A";
//   const taskName = this.$form.taskName.value;
//   this.tasks.push({ classification, taskName });
//   this.renderTasks();
//   this.$form.taskName.value = "";
//   this.persistTasks();
// };
// ABCDE.prototype.formChange = function (ev) {
//   console.log(ev);
//   if (ev && ev.target && ev.target.tagName === "INPUT") {
//     if (ev.target.name === "taskPriority") {
//       this.$form.taskPriority.forEach((i) => {
//         if (i.checked) {
//           i.parentNode.classList.add("priority-button--selected");
//           i.parentNode.classList.add(...this.consts.prioritySelectedClass);
//         } else {
//           i.parentNode.classList.remove("priority-button--selected");
//           i.parentNode.classList.remove(...this.consts.prioritySelectedClass);
//         }
//       });
//     }
//   }
// };
// new ABCDE(
//   document.querySelector(".add-task-form"),
//   document.querySelector(".task-list")
// );

class AbcdeForm extends HTMLElement {
  constructor() {
    super();
    console.log("abcde-form constr", arguments, this);

    // this.innerHTML = `<h1>Hello constructor</h1>`;
  }
  connectedCallback() {
    console.log("abcde-form connected", arguments, this);
    const shadow = this.attachShadow({ mode: "open" });
    const el = document.createElement("p");
    el.classList.add("text-xl");
    el.textContent = "this is form";
    const sty = document.createElement("style");
    sty.textContent = `:host {
      display: block;
      width: 100%;
      height: 100%;
    } p { color: red; }`;
    shadow.appendChild(sty);
    shadow.appendChild(el);
    // this.innerHTML = `<h1>Hello world</h1>`;
  }
}
customElements.define("abcde-form", AbcdeForm);

document.addEventListener("DOMContentLoaded", function () {
  console.log("helo");
});
