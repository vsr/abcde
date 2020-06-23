class TasksStorage {
  constructor() {
    this.callbacks = new Map();
  }
  get tasks() {
    try {
      const taskStr = window.localStorage.getItem("tasks");
      if (taskStr) {
        return JSON.parse(taskStr);
      }
    } catch (e) {
      console.error("error fetching tasks from localstorage", e);
      return [];
    }
  }
  set tasks(_tasks) {
    try {
      window.localStorage.setItem("tasks", JSON.stringify(_tasks));
      this.callbacks.forEach((fn) => {
        if (typeof fn === "function") {
          fn(_tasks);
        }
      });
    } catch (e) {
      console.error("error saving tasks to localstorage", e);
    }
  }
  addTask(task) {
    const tasks = this.tasks;
    tasks.push(task);
    this.tasks = tasks;
  }
  watch(callback) {
    let key = Symbol("key");
    this.callbacks.set(key, callback);
    return () => {
      this.callbacks.delete(key);
      key = null;
    };
  }
}
