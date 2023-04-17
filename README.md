#To Do App JS 

#SOLID PRINCIPLES

**Single Responsibility Principle (SRP):**

Each class in the code is responsible for one aspect of the application's functionality.
Task class: represents a single task with a description and a completion status.
DueDateTask class: represents a task with a due date, extending the Task class.
TaskList class: manages a list of tasks, responsible for adding and removing tasks.
TaskRenderer class: responsible for rendering the list of tasks in the DOM.

**Open/Closed Principle (OCP):**

Classes should be open for extension but closed for modification.
The code is designed in a way that allows the extension of the classes without modifying their implementation. The DueDateTask class extends the Task class without modifying it. The TaskRenderer class can handle both Task and DueDateTask instances without changing its implementation.

**Liskov Substitution Principle (LSP):**

Subtypes should be able to be replaced for their base types without altering the correctness of the program.
The DueDateTask class, which is derived from the Task class, demonstrates LSP. The TaskRenderer class handles both Task and DueDateTask instances, and the rendering logic remains correct for both types. This shows that the derived class (DueDateTask) can replace the base class (Task) without affecting the correctness of the program.

**Interface Segregation Principle (ISP):**

Subtypes should be able to be replaced for their base types without altering the correctness of the program.
The TaskRenderer class demonstrates the ISP as it depends on the minimal set of methods and properties it needs from the TaskList and Task classes. It does not depend on unnecessary methods or properties.

**Dependency Inversion Principle (DIP):**

High-level modules should not depend on low-level modules. Both should depend on abstractions.
The TaskRenderer class follows the DIP, as it depends on abstractions (the TaskList class) rather than concrete implementations. The constructor of the TaskRenderer class accepts a taskList object and a containerId as parameters, decoupling it from specific implementations or DOM structure. This allows for better modularity and easier testing.

#Design Patterns

#Creational Design Patterns

**Singleton Pattern**

The Singleton pattern ensures that a class has only one instance, while providing a global access point to this instance.
The SingletonTaskList class ensures that there is only one instance of the TaskList by using a static property instance. The constructor checks if an instance of SingletonTaskList already exists and if it does, it returns the existing instance. If not, it creates a new instance and saves it as SingletonTaskList.instance.

**Factory Method Pattern**

The Factory Method pattern provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. 
The TaskFactory class provides a createTask method that takes a task description and due date as arguments. Based on the presence of a due date, the method creates either a Task or a DueDateTask object and returns it.


**Abstract Factory Pattern**

The Abstract Factory pattern provides a way to encapsulate a group of individual factories that have a common theme
The AbstractTaskListFactory class provides an interface for creating task lists. The TaskListFactory and SingletonTaskListFactory classes extend AbstractTaskListFactory and provide their own implementation of the createTaskList method to create either a TaskList or a SingletonTaskList.

#Structural Design Patterns

**Decorator Pattern**

The Decorator pattern dynamically adds or overrides behavior for an individual object, without affecting the behavior of other objects from the same class. 
The TaskWithPriority class extends the Task class and adds a priority property to it. The priority property is set in the constructor, and the toggleCompletion method of the parent class is called to maintain the original behavior.

**Adapter Pattern**

The Adapter pattern allows objects with incompatible interfaces to work together by wrapping the "adaptee" with a class that implements the target interface. 
The LegacyTask class represents a task from a legacy system with a different interface. The LegacyTaskAdapter class extends the Task class and takes an instance of LegacyTask in its constructor. The LegacyTaskAdapter class implements the toggleCompletion method to call the complete method on the LegacyTask object, effectively adapting the behavior to match the interface of the Task class.

**Bridge Pattern**

The Bridge pattern decouples an abstraction from its implementation so that the two can vary independently.
The TaskListRenderer class provides an abstract interface for rendering a task list. The TaskRenderer class implements the TaskListRenderer interface and provides a concrete implementation for rendering a TaskList in the UI. This separation of abstraction and implementation allows for the abstraction (TaskListRenderer) to be used with different implementations (such as TaskRenderer) without affecting each other.

#Behavioral Design Patterns

**Observer Pattern**

The Observer pattern allows objects to subscribe to and receive notifications from a "subject" when its state changes.
The TaskListObserver class acts as the subject in the observer pattern. It holds an array of observers and provides a addObserver method for adding observers. The notifyObservers method is called to notify all observers when the task list changes. The TaskListView class acts as the observer and implements the update method to receive updates from the subject (TaskListObserver) and log the updated task list in the console.

**Command Pattern**

The Command pattern encapsulates a request as an object, allowing for parametrized requests, queuing or logging of requests, and undo/redo.
The TaskListCommand class acts as the command object in the command pattern. It holds an array of commands (either adding a task or removing a task) and provides an execute method to execute all the commands in the array. This allows for a group of actions to be performed in a queue, with the ability to undo/redo the actions if needed.