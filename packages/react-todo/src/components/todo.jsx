import React, { useState } from "react";
import avatar from "../assets/myAvatar.png";
import moment from "moment";
import TodoModal from "./modals/todoModal";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Popover, message } from "antd";
import { DeleteFilled } from "@ant-design/icons";

function Todo({ todo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const deleteTodo = async (todoId) => {
        try {
            const res = await fetch(`http://localhost:3000/todos/${todoId}`, { method: "DELETE" });
            const response = await res.json();
            queryClient.invalidateQueries(["fetchGroupsKey"]);
            message.success("Deleted Successfully!");
        } catch (error) {
            message.error("Something went wrong");
        }
    };
    const content = (
        <Popconfirm
            onConfirm={() => deleteTodo(todo.id)}
            title="Are you sure you want to delete this item?"
            okText={"Yes"}
            okType="danger"
            cancelText={"Cancel"}
        >
            <Button type="primary" danger>
                <DeleteFilled className="mx-auto"></DeleteFilled>
            </Button>
        </Popconfirm>
    );

    return (
        <>
            <div className="border border-gray-300 border-t-0 w-9/12 mx-auto hover:bg-blue-600 hover:text-white mb-5 p-2 shadow-2xl rounded-lg">
                <Popover placement="topRight" content={content} trigger="hover">
                    <div
                        className="container flex flex-row h-10 text-start justify-between pl-6"
                        onClick={() => {
                            setIsModalOpen(isModalOpen ? false : true);
                        }}
                    >
                        <h5 className="font-semibold ">{todo.name}</h5>
                        <div className="w-12">
                            <img src={todo.userPhoto ?? avatar} className="w-full rounded-full" />
                        </div>
                    </div>
                    <p className="text-start pl-6 text-gray-400 text-sm hover:text-gray-300">
                        {moment(todo.updatedAt).fromNow()}
                    </p>
                </Popover>
            </div>
            <TodoModal
                isOpen={isModalOpen}
                onClose={() => {
                    queryClient.invalidateQueries(["fetchGroupsKey"]);
                    setIsModalOpen(false);
                }}
                todoData={todo}
            />
        </>
    );
}

export default Todo;
