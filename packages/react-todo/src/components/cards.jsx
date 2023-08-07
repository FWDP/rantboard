import React from "react";
import { useEffect, useState } from "react";
import Todo from "./todo";

function Cards({ group }) {
  const [todoData, setTodoData] = useState([]);
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:3000/Todos")
      .then((response) => response.json())
      .then((result) => {
        setTodos(result);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      const data = todos.filter((todo) => todo.group == group.id);
      setTodoData(data);
    }
  }, [todos]);

  return (
    <div>
      <h3 className="font-bold text-lg m-12 text-gray-400">{group.name}</h3>
      <div className="container">
        {todoData.map((todo) => {
          return <Todo todo={todo} />;
        })}
      </div>
    </div>
  );
}
export default Cards;
