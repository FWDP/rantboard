import React, { useState } from "react";
import avatar from "../assets/myAvatar.png";
import moment from "moment";
import TodoModal from "./modals/todoModal";

function Todo({ todo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="border border-gray-300 border-t-0 w-9/12 mx-auto hover:bg-blue-600 hover:text-white mb-5 p-2 shadow-2xl rounded-lg"
        onClick={() => {
          setIsModalOpen(isModalOpen ? false : true);
        }}
      >
        <div className="container flex flex-row h-10 text-start justify-between pl-6">
          <h5 className="font-semibold ">{todo.name}</h5>
          <div className="w-12">
            <img src={avatar} className="w-full rounded-full" />
          </div>
        </div>
        <p className="text-start pl-6 text-gray-400 text-sm hover:text-gray-300">
          {moment(todo.updatedAt).fromNow()}
        </p>
      </div>
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todoData={todo}
      />
    </>
  );
}

export default Todo;
