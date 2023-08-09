import React from "react";
import Todo from "./todo";

function Cards({ group }) {
    return (
        <div className="container">
            <h3 className="font-bold text-lg m-12 text-gray-400">{group.name}</h3>
            <div className="container border border-gray-200 shadow-md rounded-lg h-[70vh] bg-white pt-12">
                {group.todos.map((todo) => {
                    return <Todo todo={todo} />;
                })}
            </div>
        </div>
    );
}
export default Cards;
