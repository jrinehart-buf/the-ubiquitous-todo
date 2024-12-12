import { create } from '@bufbuild/protobuf';
import {
    type Todo,
    type TodoList,
    TodoListSchema, TodoSchema
} from "$lib/gen/proto/simplewins/todo/v1/todo_pb";

// Instead of defineStore() or any framework magic, we can use a plain-old-es6
// class to hold global state.
class TodoStore {

    // Goodbye, "state: () => ({ foo: "bar"})", hello plain-old-properties!

    // We'll keep the list of Todos private...
    private _todoList: TodoList = $state(create(TodoListSchema))

    // ...but expose a derived/Pinia "getter"-style filtered list with a normal
    // old getter function
    get todos():Todo[] {
        switch( this.filter ) {
            case 'finished': return this._todoList.todos.filter(({ isFinished }) => isFinished)
            case 'unfinished': return this._todoList.todos.filter(({ isFinished }) => !isFinished)
            default: return this._todoList.todos
        }
    }

    // ...but we can still go loosey-goosey public string with filter
    filter: string = $state('all')

    // A cheap id: kept private!
    private nextId = 0

    // Actions? Mutations? Nope: just public methods! (You can control when
    // something reactive is updated!)
    addToDo(text:string):void {
        this._todoList.todos.push(
            create(TodoSchema, {text: text, isFinished: false, id: this.nextId++})
        )
    }

}

// Export one instance of our Store class as global state.
export const todoStore = new TodoStore()