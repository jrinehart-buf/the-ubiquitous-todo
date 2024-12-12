import { describe, it, expect } from 'vitest';
import { todoStore } from "$lib/todo/todos.svelte";

describe('TodoStore test', () => {
	it('starts with no todos', () => {
		expect( todoStore.todos.length ).toBe(0);
	});

	it('can add multiple todos', () => {
		Array(10).fill(0).map( ( _, idx) => {
			todoStore.addToDo(`Todo ${idx + 1}`)
		})
		expect(todoStore.todos.length).toBe(10)
	})

	it("recognized isFinished in filters", () => {
		todoStore.filter = 'all'
		expect(todoStore.todos.length).toBe(10)
		todoStore.filter = 'finished'
		expect(todoStore.todos.length).toBe(0)
		todoStore.filter = 'unfinished'
		expect(todoStore.todos.length).toBe(10)

		todoStore.todos[0].isFinished = true
		todoStore.todos[1].isFinished = true

		todoStore.filter = 'all'
		expect(todoStore.todos.length).toBe(10)
		todoStore.filter = 'finished'
		expect(todoStore.todos.length).toBe(2)
		todoStore.filter = 'unfinished'
		expect(todoStore.todos.length).toBe(8)
	})
});
