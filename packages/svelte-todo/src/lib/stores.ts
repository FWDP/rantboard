import { derived, get, writable } from 'svelte/store';
import type { Todo, TodoCreate, TodoUpdate, User, UserCreate } from './types';
import { nanoid } from 'nanoid';

const users = writable<User[]>([]);

const todos = writable<Todo[]>([]);

const todosPending = derived(todos, ($todos) => {
  return $todos.filter((todo) => todo.status === 'pending');
});

const todosInProgress = derived(todos, ($todos) => {
  return $todos.filter((todo) => todo.status === 'in-progress');
});

const todosDone = derived(todos, ($todos) => {
  return $todos.filter((todo) => todo.status === 'done');
});

const storeInvalidator = (todo: Todo) => {
  todos.update(($todos) => [...$todos, todo]);
  users.update(($users) => {
    $users.find((user) => {
      if (user.id === todo.user) {
        user.todos?.push(todo.user);
        return;
      }
    });
    return $users;
  });
};

const createTodo = (userId: string, todo: TodoCreate) => {
  const user = getUser(userId);
  const newTodo: Todo = {
    id: nanoid(),
    user: user.id,
    title: todo.title,
    description: todo.description,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  storeInvalidator(newTodo);
};

const getTodo = (id: string): Todo => {
  return get(todos).find((todo) => todo.id === id) as Todo;
};

const updateTodo = (todo: TodoUpdate) => {
  const currentTodo = getTodo(todo.id);
  const updatedTodo: Todo = {
    ...currentTodo,
    ...todo,
    updatedAt: new Date(),
  };
  storeInvalidator(updatedTodo);
};

const removeTodo = (todoId: string) => {
  todos.update(($todos) => $todos.filter((todo) => todo.id !== todoId));
};

const getUser = (id: string) => {
  return get(users).find((user) => user.id === id) as User;
};

const createUser = (user: UserCreate) => {};

export {
  todos as todoStore,
  users as userStore,
  todosPending,
  todosInProgress,
  todosDone,
  createTodo,
  getTodo,
  updateTodo,
  removeTodo,
  getUser,
};
