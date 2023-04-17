// Task class represents a single task in the to-do list
class Task {
    constructor(description) {
        this.description = description; // Task class represents a single task in the to-do list
        this.completed = false; // indicates if the task is completed or not
    }

    // toggleCompletion function toggles the completion status of the task
    toggleCompletion() {
        this.completed = !this.completed;
    }
}

// TaskList class represents the list of tasks in the to-do app
class TaskList {
    constructor() {
        this.tasks = [];// array of tasks
    }

    // addTask function adds a new task to the list of tasks
    addTask(task) {
        this.tasks.push(task);
    }

    // addTask function adds a new task to the list of tasks
    removeTask(index) {
        this.tasks.splice(index, 1);
    }
}

// DueDateTask class represents a task with a due date
class DueDateTask extends Task {
    constructor(description, dueDate) {
        super(description); // calling the constructor of the parent class
        this.dueDate = new Date(dueDate); // due date of the task
    }

    // isOverdue function checks if the task is overdue or not
    isOverdue() {
        const now = new Date();
        return this.dueDate < now && !this.completed;
    }
}

// TaskRenderer class is responsible for rendering the list of tasks in the UI
class TaskRenderer {
    constructor(taskList, containerId) {
        this.taskList = taskList; // task list to be rendered
        this.container = document.getElementById(containerId); // container element in the UI
    }

    // render function renders the list of tasks in the UI
    render() {
        this.container.innerHTML = ''; // clear the container element

        this.taskList.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const taskDescription = document.createElement('span');
            taskDescription.textContent = task.description;

            if (task instanceof DueDateTask) {
                const dueDateText = document.createElement('span');
                dueDateText.textContent = ` (due ${task.dueDate.toLocaleDateString()})`;
                if (task.isOverdue()) {
                    dueDateText.style.color = 'red';
                }
                taskDescription.appendChild(dueDateText);
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                this.taskList.removeTask(index);
                this.render();
            });

            taskDescription.addEventListener('click', () => {
                task.toggleCompletion();
                this.render();
            });

            if (task.completed) {
                taskDescription.style.textDecoration = 'line-through';
            }
            li.appendChild(taskDescription);
            li.appendChild(deleteBtn);
            this.container.appendChild(li);
        });
    }
}

// Creational Design Patterns
//Singleton Pattern
class SingletonTaskList {
    constructor() {
        if (!SingletonTaskList.instance) {
            this.tasks = [];
            SingletonTaskList.instance = this;
        }
        return SingletonTaskList.instance;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }
}

//Factory Method Pattern
class TaskFactory {
    createTask(description, dueDate) {
        let task;
        if (dueDate) {
            task = new DueDateTask(description, dueDate);
        } else {
            task = new Task(description);
        }
        return task;
    }
}

//Abstract Factory Pattern
class AbstractTaskListFactory {
    createTaskList() { }
}

class TaskListFactory extends AbstractTaskListFactory {
    createTaskList() {
        return new TaskList();
    }
}

class SingletonTaskListFactory extends AbstractTaskListFactory {
    createTaskList() {
        return new SingletonTaskList();
    }
}

// Structural Design Patterns
//Decorator Pattern
class TaskWithPriority extends Task {
    constructor(task, priority) {
        super(task.description);
        this.task = task;
        this.priority = priority;
    }

    toggleCompletion() {
        this.task.toggleCompletion();
    }
}

//Adapter Pattern
class LegacyTask {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

class LegacyTaskAdapter extends Task {
    constructor(legacyTask) {
        super(legacyTask.description);
        this.legacyTask = legacyTask;
    }

    toggleCompletion() {
        this.legacyTask.complete();
    }
}

//Bridge Pattern
class TaskListRenderer {
    constructor(taskList) {
        this.taskList = taskList;
    }
}

class HtmlTaskListRenderer extends TaskListRenderer {
    render() {
        const ul = document.createElement('ul');
        this.taskList.tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.description;
            ul.appendChild(li);
        });
        return ul;
    }
}

class TextTaskListRenderer extends TaskListRenderer {
    render() {
        return this.taskList.tasks.reduce((acc, task) => acc + task.description + '\n', '');
    }
}

// Behavioral Design Patterns
//Observer Pattern
class TaskListObserver {
    constructor(taskList) {
        this.taskList = taskList;
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.taskList));
    }
}

class TaskListView {
    constructor(taskListObserver) {
        this.taskListObserver = taskListObserver;
        this.taskListObserver.addObserver(this);
    }

    update(taskList) {
        console.log(`Task List View: ${taskList.tasks.map(task => task.description).join(', ')}`);
    }
}

//Command Pattern
class TaskListCommand {
    constructor(taskList) {
        this.taskList = taskList;
        this.commands = [];
    }

    addTask(task) {
        this.commands.push(() => this.taskList.addTask(task));
    }

    removeTask(index) {
        this.commands.push(() => this.taskList.removeTask(index));
    }

    execute() {
        this.commands.forEach(command => command());
    }
}

// create a new task list and task renderer objects
const taskList = new TaskList();
const taskRenderer = new TaskRenderer(taskList, 'taskList');

// add event listener to the 'Add Task' button
document.getElementById('addTask').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskDescription = taskInput.value.trim();
    const dueDateValue = dueDateInput.value;

    if (taskDescription) {
        const taskFactory = new TaskFactory();
        const task = taskFactory.createTask(taskDescription, dueDateValue);
        taskList.addTask(task); // add the new task to the task list
        taskRenderer.render(); // render the updated task list in the UI
        taskInput.value = ''; // clear the task input field
        dueDateInput.value = ''; // clear the due date input field
    }
});

// render the initial list of tasks in the UI
taskRenderer.render();



