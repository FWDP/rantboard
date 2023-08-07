import type { Todo, User } from './types';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

enum Status {
  Pending = 'pending',
  InProgress = 'in-progress',
  Done = 'done',
}

const generateUser = (): User => {
  return {
    id: nanoid(),
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
    text: faker.lorem.sentence(),
    status: faker.helpers.enumValue(Status),
    createdAt: date,
    updatedAt: date,
  };
};

export const generateUserWithTodos = (todos?: number): User => {
  const user = generateUser();
  const todoCount = todos || faker.datatype.number({ min: 1, max: 10 });
  for (let i = 0; i < todoCount; i++) {
    const todo = generateTodo(user.id);
    user.todos?.push(todo.id);
  }
  return user;
};
