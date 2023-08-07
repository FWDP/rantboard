import { derived, get, writable } from 'svelte/store';
import type { Todo, User } from './types';
import { nanoid } from 'nanoid';

const users = writable<User[]>([]);

const todos = writable<Todo[]>([]);

const inProgress = derived(todos, ($todos) => {
  return $todos.filter((todo) => todo.status === 'in-progress');
});

const todosDone = derived(todos, ($todos) => {
  return $todos.filter((todo) => todo.status === 'in-progress');
});

const getTodos = () => {
  return get(todos);
};

// cascade users also
const clearTodos = () => {
  todos.update(() => []);
};

const createTodo = (userId: string, todo: Todo) => {
  const user = get(users).find((user) => user.id === userId) as User;
  const newTodo: Todo = {
    id: nanoid(),
    user: user.id,
    text: todo.text,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  // user.todos?.push(newTodo);
  todos.update(($todos) => [...$todos, newTodo]);
  users.update(($users) => {
    $users.find((user) => {
      if (user.id === userId) {
        user.todos?.push(newTodo.id);
        return;
      }
    });
    return $users;
  });
};

const updateTodo = (user: string, todo: string) => {
  //TODO: Check if user and todo exists inside the user todos props
  //TODO: Update todo inside todosStore
  //TODO: Update todo inside user todos props
  //TODO: Update updatedAt field
};

const removeTodo = (user: string, todo: Todo) => {};

const createUser = (user: User) => {};
const removeUser = (user: User) => {};
