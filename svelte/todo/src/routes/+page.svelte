<script lang="ts">
// No framework imports! Just our "singleton" TodoStore.
import { todoStore } from "$lib/todo/todos.svelte";

// We've got some state that's local to this component, and (for now), it'll
// be reactive, so we use $state() to mark its value as reactive.
let newTodoText = $state('')

// Nothing frameworky here: just check a value for validity, hand it off to our
// store, then reset local state.
function addTodo() {
    if (!newTodoText) {
        return
    }

    todoStore.addToDo(newTodoText)
    newTodoText = ''
}
</script>

<!--
Svelte allows us to bind a "group" of same-named radios to a value, with
the value of the radio being the value used to update the store.
-->
<label><input bind:group={todoStore.filter} name="filter" type="radio" value="all"> All</label>
<label><input bind:group={todoStore.filter} name="filter" type="radio" value="finished"> Finished</label>
<label><input bind:group={todoStore.filter} name="filter" type="radio" value="unfinished"> Unfinished</label>

<ul class="mt-2">
    <!-- Svelte binding on an iterable: ITERABLE as THING(id) -->
    {#each todoStore.todos as todo (todo.id)}
        <li>
            <input bind:checked={todo.isFinished} type="checkbox" />
            { todo.text }
        </li>
    {/each}
</ul>

<!--
Hey, look! An old-school form! No evading normal form mechanics and doing
manual listening for @keyup.enter stuff! The only framework bits here are
where we two-way bind our text input (not great) and the button's disabled
value.
-->
<form onsubmit="{addTodo}" class="mt-2">
<label>
    New Todo:
    <input bind:value={newTodoText} type="text" />
</label>
<button disabled={!newTodoText} type="submit" class="btn">Add</button>
</form>