export type User = {
  id: string;
  firstName: string;
  lastName: string;
  todos?: string[];
};

export type Todo = {
  id: string;
  user: string;
  text: string;
  status: 'pending' | 'in-progress' | 'done';
  createdAt: Date;
  updatedAt?: Date;
};
