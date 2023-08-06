export type User = {
    id: string;
    firstName: string;
    lastName: string;
    todos?: Todo[];
};

export type Todo = {
    id: string;
    user: User;
    text: string;
    status: "pending" | "in-progress" | "done";
    createdAt: Date;
};
