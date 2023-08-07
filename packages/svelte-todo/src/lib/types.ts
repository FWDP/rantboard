export type User = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  todos?: string[];
};

export type Todo = {
  id: string;
  user: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
  createdAt: Date;
  updatedAt?: Date;
};

export type TodoCreate = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
export type TodoUpdate = Partial<TodoCreate> & Pick<Todo, 'id' | 'user'>;
export type UserCreate = Omit<User, 'id'>;
