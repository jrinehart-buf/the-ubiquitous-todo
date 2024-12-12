// Instead of defineStore() or any framework magic, we can use a plain-old-es6
// class to hold global state.
class TodoStore {

    // Goodbye, "state: () => ({ foo: "bar"})", hello plain-old-properties!

    // We'll keep the list of Todos private...
    private _todos: Todo[] = $state([])
    // ...but expose a derived/Pinia "getter"-style filtered list with a normal
    // old getter function
    get todos():Todo[] {
        switch( this.filter ) {
            case 'finished': return this._todos.filter(it => it.isFinished)
            case 'unfinished': return this._todos.filter(it => !it.isFinished)
            default: return this._todos
        }
    }

    // ...but we can still go loosey-goosey public string with filter
    filter: string = $state('all')

    // A cheap id: kept private!
    private nextId = 0

    // Actions? Mutations? Nope: just public methods! (You can control when
    // something reactive is updated!)
    addToDo(text:string):void {
        this._todos.push({text: text, isFinished: false, id: this.nextId++})
    }

}

// No need for a full-blown class: we just want a simple shape of a to-do to
// be defined.
interface Todo {
    text: string
    id: number
    isFinished: boolean
}

// Export one instance of our Store class as global state.
export const todoStore = new TodoStore()