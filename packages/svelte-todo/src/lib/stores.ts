import { derived, get, writable } from "svelte/store";
import type { Todo, User } from "./types";

const users = writable<User[]>([]);

const todos = writable<Todo[]>([]);

const inProgress = derived(todos, ($todos) => {
    return $todos.filter((todo) => todo.status === "in-progress");
});

const todosDone = derived(todos, ($todos) => {
    return $todos.filter((todo) => todo.status === "in-progress");
});

const getTodos = () => {
    return get(todos);
};

const clearTodos = () => {
    todos.update(() => []);
};

const createTodo = (user: User, todo: Todo) => {};
const updateTodo = (user: User, todo: Todo) => {};
const removeTodo = (user: User, todo: Todo) => {};

const createUser = (user: User) => {};
const removeUser = (user: User) => {};
