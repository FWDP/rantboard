import type { Todo, TodoCreate, User } from './types';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';
import { userStore, todoStore } from './stores';

enum Status {
  Pending = 'pending',
  InProgress = 'in-progress',
  Done = 'done',
}

const generateUser = (): User => {
  return {
    id: nanoid(),
    avatar: faker.image.avatarGitHub(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    todos: [],
  };
};

const generateTodo = (user: string): Todo => {
  const date = faker.date.recent({ days: 7 });
  return {
    id: nanoid(),
    user,
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    description: faker.lorem.paragraphs(),
    status: faker.helpers.enumValue(Status),
    createdAt: date,
    updatedAt: date,
  };
};

export const generateTodoCreate = (user: string): TodoCreate => {
  return {
    user,
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    description: faker.lorem.paragraphs(),
    status: faker.helpers.enumValue(Status),
  };
};

export const generateUserWithTodos = (count?: number): User => {
  const generatedUser = generateUser();
  const generatedTodos: Todo[] = [];
  const todoCount = count || faker.number.int({ min: 1, max: 10 });
  for (let i = 0; i < todoCount; i++) {
    const todo = generateTodo(generatedUser.id);
    generatedTodos.push(todo);
  }
  generatedTodos.forEach((todo) => {
    generatedUser.todos?.push(todo.id);
  });
  todoStore.update((todos) => [...todos, ...generatedTodos]);
  userStore.update((users) => [...users, generatedUser]);
  return generatedUser;
};
