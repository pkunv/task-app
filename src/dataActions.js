import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const defaultTasks = [
  {
    id: 1,
    name: "Making a salad",
    description: "",
    realizationOpt: "singleDay",
    singleDtOpt: returnDate(0),
    fromDtOpt: "",
    toDtOpt: "",
    important: false,
    creationDt: returnDate(0),
    done: true,
    time: 2400,
    entries: [{ time: 2400, comment: "", dt: returnDate(0) }]
  },
  {
    id: 2,
    name: "Creating a web app",
    description: "",
    realizationOpt: "fromTo",
    singleDtOpt: "",
    fromDtOpt: returnDate(-2),
    toDtOpt: returnDate(1),
    important: false,
    creationDt: returnDate(1),
    done: false,
    time: 4800,
    entries: []
  },
  {
    id: 3,
    name: "Not in My Day",
    description: "",
    realizationOpt: "singleDay",
    singleDtOpt: returnDate(-2),
    fromDtOpt: "",
    toDtOpt: "",
    important: false,
    creationDt: returnDate(1),
    done: true,
    time: 3600,
    entries: []
  }
];

export async function getSummary() {
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  await fakeNetwork(`getSummary`);
  let tasks = await localforage.getItem("tasks");
  if (tasks === null) {
    set(defaultTasks);
    tasks = defaultTasks;
  }

  var lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - ((lastWeek.getDay() + 6) % 7)); // starting at monday

  var weeklySummary = {
    entries: { arr: new Array(7).fill(0), amount: 0 },
    hours: { arr: new Array(7).fill(0), amount: 0 }
  };

  tasks.forEach((task) => {
    Object.entries(weeklySummary).forEach((obj) => {
      var sum = obj[1];
      var type = obj[0];
      task.entries.forEach((entry) => {
        if (type === "entries") {
          sum.arr[new Date(entry.dt).getDay()]++;
          sum.amount++;
        }
        if (type === "hours") {
          sum.arr[new Date(entry.dt).getDay()] += entry.time / 3600;
          sum.amount += entry.time / 3600;
        }
      });
    });
  });
  return weeklySummary;
}
export async function getReport(setting = {}) {
  await fakeNetwork(`getReport:${setting}`);
  let tasks = await localforage.getItem("tasks");
  var entries = tasks
    .map((task, tIndex) => {
      var row = task.entries
        .map((entry, index) => {
          entry.taskName = task.name;
          entry.taskID = task.id;
          entry.id = tIndex;
          return entry;
        })
        .filter((entry) => {
          return (
            new Date(entry.dt).getMonth() + 1 === parseInt(setting.month, 0)
          );
        });

      return row;
    })
    .flat(1);
  console.log(entries);
  return entries;
}

export async function getTasks(
  setting,
  query,
  filters = [],
  sortSetting = undefined
) {
  await fakeNetwork(`getTasks:${query}`);
  let tasks = await localforage.getItem("tasks");

  if (tasks === null) {
    set(defaultTasks);
    tasks = defaultTasks;
  }

  if (query) {
    tasks = matchSorter(tasks, query, { keys: ["name", "important"] });
  }
  filters.forEach((filter) => {
    switch (filter.type) {
      case "taskrealization":
        tasks =
          filter.value.length > 0
            ? tasks.filter((task) => {
                return task.realizationOpt === filter.value;
              })
            : tasks;
        break;
      case "undone":
        if (filter.value === "on")
          tasks = tasks.filter((task) => {
            return !task.done;
          });
        break;
      default:
        break;
    }
  });
  if (setting === "myday") {
    return tasks.filter((el) => {
      return compareDates(
        new Date(),
        el.realizationOpt === "singleDay" ? el.singleDtOpt : el.fromDtOpt,
        el.realizationOpt === "singleDay" ? undefined : el.toDtOpt
      );
    });
  }
  if (setting === "related") {
    return tasks
      .filter((el) => {
        return el.realizationOpt === "singleDay";
      })
      .slice(0, 3);
  }
  if (setting === "top") {
    return tasks.sort(sortBy("creationDt")).slice(0, 3);
  }

  if (sortSetting) {
    var sort = sortSetting.split("-");
    var order = parseInt(sort[1], 0);
    switch (sort[0]) {
      case "important":
        tasks = tasks.sort((a, b) => {
          return order ? b.important - a.important : a.important - b.important;
        });
        break;
      case "hours":
        tasks = tasks.sort((a, b) => {
          var aHours = a.entries
            .map((entry) => {
              return entry.time;
            })
            .reduce((partialSum, a) => partialSum + a, 0);
          var bHours = b.entries
            .map((entry) => {
              return entry.time;
            })
            .reduce((partialSum, a) => partialSum + a, 0);
          return order ? bHours - aHours : aHours - bHours;
        });
        break;
      default:
        tasks = tasks.sort(sortBy("creationDt"));
        break;
    }
  }
  return tasks;
}

export async function createTask(task) {
  await fakeNetwork();
  let tasks = await getTasks();
  let id = tasks.length + 1;
  task.id = id;
  task.singleDtOpt = new Date(task.singleDtOpt);
  task.fromDtOpt = new Date(task.fromDtOpt);
  task.toDtOpt = new Date(task.toDtOpt);
  tasks.unshift(task);
  await set(tasks);
  return task;
}

export async function getTask(id) {
  await fakeNetwork(`task:${id}`);
  let tasks = await localforage.getItem("tasks");
  let task = tasks.find((task) => task.id == id);
  //await new Promise((r) => setTimeout(r, 2000)); // fake latency
  return task ?? null;
}

export async function updateTask(id, updates) {
  await fakeNetwork();
  let tasks = await localforage.getItem("tasks");
  let task = tasks.find((el) => el.id == id);
  if (!task) throw new Error("No task found for", id);
  if (updates.singleDtOpt) {
    updates.singleDtOpt = new Date(updates.singleDtOpt);
  }
  if (updates.fromDtOpt) {
    updates.fromDtOpt = new Date(updates.fromDtOpt);
  }
  if (updates.toDtOpt) {
    updates.toDtOpt = new Date(updates.toDtOpt);
  }
  Object.assign(task, updates);
  await set(tasks);
  return task;
}

export async function deleteTask(id) {
  let tasks = await localforage.getItem("tasks");
  let index = tasks.findIndex((task) => task.id == id);
  if (index > -1) {
    tasks.splice(index, 1);
    await set(tasks);
    return true;
  }
  return false;
}

function set(tasks) {
  return localforage.setItem("tasks", tasks);
}

function returnDate(dayManipulation = 0) {
  var dt = new Date();
  dt.setDate(dt.getDate() + dayManipulation);
  return dt;
}

const compareDates = (dCompare, d1, d2) => {
  let dateCompare = new Date(
    dCompare.getFullYear(),
    dCompare.getMonth(),
    dCompare.getDate()
  ).getTime();
  let date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  if (!d2) {
    return dateCompare === date1;
  } else {
    let date2 = new Date(
      d2.getFullYear(),
      d2.getMonth(),
      d2.getDate()
    ).getTime();
    return dateCompare > date1 && dateCompare < date2;
  }
};

let fakeCache = {};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
