const ts = new TasksStorage();
const list = document.querySelector("#list");

const updateList = () => {
  console.log("update list");
  list.tasks = ts.tasks;
  list.renderTasks();
};

ts.watch(updateList);
list.tasks = ts.tasks;
console.log(list);
list.onItemDelete = () => console.log("outside delete listener", arguments);

const form = document.querySelector("#main-task-form");
form.addEventListener("submit", function (ev) {
  console.log("form submit", ev);
  ts.addTask({
    classification: ev.detail.priority,
    taskName: ev.detail.text,
  });
});
// #main-task-form"
